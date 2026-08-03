import { defineCollection, z } from 'astro:content';

const academicCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    institution: z.string(),
    period: z.string(),
    cgpa: z.string().optional(),
    fypTitle: z.string().optional(),
    fypDesc: z.string().optional(),
    order: z.number()
  })
});

export const collections = {
  academic: academicCollection
};
