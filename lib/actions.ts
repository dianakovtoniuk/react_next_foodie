'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { saveMeal } from './meals';

export type ShareMealState = {
  message: string | null;
};

function isInvalidText(text: string | null | undefined) {
  return !text || text.trim() === '';
}

export async function shareMeal(
  prevState: ShareMealState,
  formData: FormData
): Promise<ShareMealState> {
  const meal = {
    title: formData.get('title') as string,
    summary: formData.get('summary') as string,
    instructions: formData.get('instructions') as string,
    image: formData.get('image') as File,
    creator: formData.get('name') as string,
    creator_email: formData.get('email') as string,
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: 'Invalid input.',
    };
  }

  await saveMeal(meal);
  revalidatePath('/meals');
  redirect('/meals');
}