import { auditLog, type Db } from '@stassist/db';

export async function writeAuditLog(
  db: Db,
  params: {
    actorId: string | null;
    action: string;
    entity: string;
    entityId?: string | null;
    payload?: Record<string, unknown>;
    requestId?: string;
  },
): Promise<void> {
  await db.insert(auditLog).values({
    actorId: params.actorId,
    action: params.action,
    entity: params.entity,
    entityId: params.entityId ?? null,
    payload: params.payload ?? null,
    requestId: params.requestId ?? null,
  });
}
