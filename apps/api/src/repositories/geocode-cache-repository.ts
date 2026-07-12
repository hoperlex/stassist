import { eq } from 'drizzle-orm';
import { geocodeCache, type Db } from '@stassist/db';
import type { GeocodeResult } from '@stassist/shared';

export async function findCachedGeocode(db: Db, queryNorm: string): Promise<GeocodeResult | null> {
  const rows = await db.select().from(geocodeCache).where(eq(geocodeCache.queryNorm, queryNorm)).limit(1);
  const row = rows[0];
  if (!row) return null;
  return { placeName: row.placeName, lat: row.lat, lon: row.lon, tzId: row.tzId };
}

export async function upsertCachedGeocode(
  db: Db,
  params: { queryNorm: string; result: GeocodeResult; provider: string; now?: Date },
): Promise<void> {
  const now = params.now ?? new Date();
  await db
    .insert(geocodeCache)
    .values({
      queryNorm: params.queryNorm,
      placeName: params.result.placeName,
      lat: params.result.lat,
      lon: params.result.lon,
      tzId: params.result.tzId,
      provider: params.provider,
      fetchedAt: now,
    })
    .onConflictDoUpdate({
      target: geocodeCache.queryNorm,
      set: {
        placeName: params.result.placeName,
        lat: params.result.lat,
        lon: params.result.lon,
        tzId: params.result.tzId,
        provider: params.provider,
        fetchedAt: now,
        updatedAt: now,
      },
    });
}
