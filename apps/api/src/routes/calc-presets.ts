/**
 * /api/v1/calc-presets — список расчётных пресетов, видимых пользователю: системные
 * (user_id=null, засеяны в Ф2, см. @stassist/db seed) + собственные (задел на будущее — создание
 * пользовательских пресетов не входит в объём Ф2).
 */
import type { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { calcPresetRecordSchema, type Config } from '@stassist/shared';
import { buildRequireAuth } from '../auth/require-auth.js';
import { requireDbOr503 } from '../route-context.js';
import { listVisibleCalcPresets } from '../repositories/calc-presets-repository.js';

export interface CalcPresetsRoutesOptions {
  config: Config;
}

export const calcPresetsRoutes: FastifyPluginAsync<CalcPresetsRoutesOptions> = async (app, opts) => {
  const { config } = opts;
  app.addHook('preHandler', buildRequireAuth(config));

  app.get('/', { schema: { response: { 200: z.array(calcPresetRecordSchema) } } }, async (req, reply) => {
    const db = requireDbOr503(config, reply, req.id);
    if (!db) return;
    const rows = await listVisibleCalcPresets(db, req.authUser!.id);
    return reply.send(
      rows.map((row) => ({ id: row.id, userId: row.userId, name: row.name, isSystem: row.userId === null })),
    );
  });
};
