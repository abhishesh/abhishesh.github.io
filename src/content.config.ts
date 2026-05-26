import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// About section blocks (Principles, Tech, Life, Fandoms)
const aboutBlocks = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/about-blocks' }),
  schema: z.object({
    title: z.string(),
    items: z.array(z.string()),
  }),
});

// Social links
const socialLinks = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/social' }),
  schema: z.object({
    label: z.string(),
    href: z.string().url(),
  }),
});

// Photography equipment rows
const photographyEquipment = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/photography' }),
  schema: z.object({
    category: z.string(),
    items: z.array(
      z.object({
        name: z.string(),
        url: z.string().url().optional(),
      })
    ),
  }),
});

// Photography portfolio links + editing tools
const photographyResources = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/photography-resources' }),
  schema: z.object({
    type: z.enum(['portfolio', 'editing']),
    label: z.string(),
    href: z.string().url().optional(),
  }),
});

// Audio gear table
const audioGear = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/audio-gear' }),
  schema: z.object({
    category: z.string(),
    equipment: z.string(),
  }),
});

// Detailed sound signature profiles
const soundProfiles = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/sound-profiles' }),
  schema: z.object({
    model: z.string(),
    bass: z.string(),
    mids: z.string(),
    treble: z.string(),
    signature: z.string(),
    frGraph: z.string().optional(),
  }),
});

// Audio resources (blogs + playlists)
const audioResources = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/audio-resources' }),
  schema: z.object({
    type: z.enum(['blog', 'playlist']),
    label: z.string(),
    href: z.string().url(),
    note: z.string().optional(),
  }),
});

// Desk setup
const deskEquipment = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/desk-equipment' }),
  schema: z.object({
    category: z.string(),
    equipment: z.string(),
  }),
});

// Travel regions
const travelRegions = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/travel' }),
  schema: z.object({
    region: z.string(),
    description: z.string(),
    countries: z.array(
      z.object({
        name: z.string(),
        albumUrl: z.string().url().optional(),
      })
    ),
  }),
});

// Hobbies prose sections (Coffee + Perfumes) — Markdown
const hobbiesProse = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/hobbies-prose' }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {
  'about-blocks': aboutBlocks,
  social: socialLinks,
  'photography-equipment': photographyEquipment,
  'photography-resources': photographyResources,
  'audio-gear': audioGear,
  'sound-profiles': soundProfiles,
  'audio-resources': audioResources,
  'desk-equipment': deskEquipment,
  'travel-regions': travelRegions,
  'hobbies-prose': hobbiesProse,
};
