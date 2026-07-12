import { describe, expect, it } from 'vitest';
import { articleSlugForChunkKey } from './wiki.js';

describe('articleSlugForChunkKey (закрывает МАЖОР [missing-step] f7.md — правило привязки чанка к статье)', () => {
  it('sign:*:overview → signs/{sign}', () => {
    expect(articleSlugForChunkKey('sign:aries:overview')).toEqual({ section: 'signs', slug: 'aries' });
  });

  it('planet:*:overview → planets/{planet}', () => {
    expect(articleSlugForChunkKey('planet:mars:overview')).toEqual({ section: 'planets', slug: 'mars' });
  });

  it('house:*:overview → houses/house-{n}', () => {
    expect(articleSlugForChunkKey('house:7:overview')).toEqual({ section: 'houses', slug: 'house-7' });
  });

  it('planet_in_sign → statья планеты (не знака) — решение зафиксировано в doc-комментарии', () => {
    expect(articleSlugForChunkKey('planet_in_sign:mars:leo')).toEqual({ section: 'planets', slug: 'mars' });
  });

  it('planet_in_house → статья планеты', () => {
    expect(articleSlugForChunkKey('planet_in_house:venus:7')).toEqual({ section: 'planets', slug: 'venus' });
  });

  it('point_in_sign/point_in_house (кармические точки) → раздел planets', () => {
    expect(articleSlugForChunkKey('point_in_sign:chiron:leo')).toEqual({ section: 'planets', slug: 'chiron' });
    expect(articleSlugForChunkKey('point_in_house:north_node:6')).toEqual({ section: 'planets', slug: 'north_node' });
  });

  it('asc_in_sign → раздел signs', () => {
    expect(articleSlugForChunkKey('asc_in_sign:leo')).toEqual({ section: 'signs', slug: 'leo' });
  });

  it('aspect:{angle}:overview (3 части) → aspects/{angle}', () => {
    expect(articleSlugForChunkKey('aspect:square:overview')).toEqual({ section: 'aspects', slug: 'square' });
  });

  it('aspect:{a}:{angle}:{b} (между объектами, 4 части) → aspects/{angle}', () => {
    expect(articleSlugForChunkKey('aspect:sun:square:moon')).toEqual({ section: 'aspects', slug: 'square' });
  });

  it('arcanum:{n}:{position} → arcana/arkan-{n}', () => {
    expect(articleSlugForChunkKey('arcanum:3:health_throat')).toEqual({ section: 'arcana', slug: 'arkan-3' });
    expect(articleSlugForChunkKey('arcanum:7:purpose_social')).toEqual({ section: 'arcana', slug: 'arkan-7' });
  });

  it('numerology:* и прочее — не привязывается ни к одной статье (null, не выдумка)', () => {
    expect(articleSlugForChunkKey('numerology:life_path:7')).toBeNull();
    expect(articleSlugForChunkKey('element:fire:overview')).toBeNull();
    expect(articleSlugForChunkKey('unknown:foo:bar')).toBeNull();
  });
});
