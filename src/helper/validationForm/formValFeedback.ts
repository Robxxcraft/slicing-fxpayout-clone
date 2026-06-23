import type { FormFeedback } from "@/types/validationForm.type";

export const checkValidFormFeedback = (vals: FormFeedback) => {
  const errors: Partial<Record<keyof FormFeedback, string>> = {};
  const key = "homepage:reviews.modal.form.errors";
  if (!vals.username.trim()) errors.username = `${key}.usernameRequired`;
  if (!vals.location.trim()) errors.location = `${key}.locationRequired`;
  if (!vals.review.trim()) errors.review = `${key}.reviewRequired`;
  if (vals.rating > 5 || vals.rating < 1) {
    errors.rating = `${key}.invalidRangeRating`;
  }

  return errors;
};
