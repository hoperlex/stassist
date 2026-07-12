/**
 * /api/v1/personal-cycles — виджет «ваш персональный год/месяц/день» кабинета (req.6 промта Ф6).
 * Берёт первый профиль `kind='self'` пользователя (fallback — первый любой профиль); без единого
 * профиля рождения — честный empty-state (`computed:false`), а не 404/500 (см. §6 конвенций
 * реализации, «правило непустоты» — пустой список тоже обязан иметь осмысленный ответ).
 */
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { personalCyclesWidgetResponseSchema, type Config } from '@stassist/shared';
import { personalCycles } from '@stassist/numerology-core';
import { numerologyCycleKey } from '@stassist/llm';
import { buildRequireAuth } from '../auth/require-auth.js';
import { getPdKeyring } from '../auth/pd-keyring.js';
import { requireDbOr503 } from '../route-context.js';
import { listBirthProfiles } from '../repositories/birth-profiles-repository.js';
import { DrizzleChunkRepository } from '../llm/drizzle-chunk-repository.js';

export interface PersonalCyclesRoutesOptions {
  config: Config;
}

const EMPTY_RESPONSE = {
  personalYear: null,
  personalMonth: null,
  personalDay: null,
  yearText: null,
  monthText: null,
  dayText: null,
  computed: false,
} as const;

export const personalCyclesRoutes: FastifyPluginAsyncZod<PersonalCyclesRoutesOptions> = async (app, opts) => {
  const { config } = opts;
  const requireAuth = buildRequireAuth(config);
  app.addHook('preHandler', requireAuth);

  app.get('/', { schema: { response: { 200: personalCyclesWidgetResponseSchema } } }, async (req, reply) => {
    const db = requireDbOr503(config, reply, req.id);
    if (!db) return;
    const keyring = getPdKeyring(config);
    const profiles = await listBirthProfiles(db, req.authUser!.id, keyring);
    const profile = profiles.find((p) => p.kind === 'self') ?? profiles[0];
    if (!profile) return reply.send(EMPTY_RESPONSE);

    const [, monthStr, dayStr] = profile.birthDate.split('-');
    const now = new Date();
    const cycles = personalCycles(
      { day: Number(dayStr), month: Number(monthStr) },
      { day: now.getUTCDate(), month: now.getUTCMonth() + 1, year: now.getUTCFullYear() },
    );

    const chunkRepository = new DrizzleChunkRepository(db);
    const keys = [
      numerologyCycleKey('personal_year', cycles.personalYear),
      numerologyCycleKey('personal_month', cycles.personalMonth),
      numerologyCycleKey('personal_day', cycles.personalDay),
    ];
    const chunks = await chunkRepository.getByKeys(keys);
    const byKey = new Map(chunks.map((c) => [c.key, c.text]));

    return reply.send({
      personalYear: cycles.personalYear,
      personalMonth: cycles.personalMonth,
      personalDay: cycles.personalDay,
      yearText: byKey.get(keys[0]!) ?? null,
      monthText: byKey.get(keys[1]!) ?? null,
      dayText: byKey.get(keys[2]!) ?? null,
      computed: true,
    });
  });
};
