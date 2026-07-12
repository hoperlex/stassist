/**
 * Опорная локация публичного лунного календаря — единственный источник правды в
 * `@stassist/shared` (см. packages/shared/src/constants.ts `CALENDAR_REFERENCE_LOCATION`),
 * переиспользуется и здесь (worker, предрасчёт), и в apps/api (отдача ответа) — см. findings
 * f3.md [internal-completeness] «не задана опорная локация».
 */
export { CALENDAR_REFERENCE_LOCATION, CALENDAR_REFERENCE_SNAPSHOT_HOUR as REFERENCE_SNAPSHOT_HOUR } from '@stassist/shared';
