import React from "react";
import { motion } from "framer-motion";
import { useFormContext, Controller } from "react-hook-form";
import type { CreateEventFormData } from "../../../types";
import { FileUploadInput } from "../../../components/FileUploadInput";

export const EventDetailsStep: React.FC = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<CreateEventFormData>();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <label htmlFor="title" className="block text-primary font-medium">
          Event Title
        </label>
        <input
          type="text"
          id="title"
          {...register("title")}
          className="w-full px-4 py-2 rounded-lg border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="date" className="block text-primary font-medium">
          Event Date
        </label>
        <input
          type="date"
          id="date"
          {...register("date")}
          className="w-full px-4 py-2 rounded-lg border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary"
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-primary font-medium">
          Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="w-full px-4 py-2 rounded-lg border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary h-32"
        />
      </div>

      <Controller
        name="flyer_file"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FileUploadInput
            label="Flyer Image"
            value={value}
            onChange={onChange}
            error={error?.message}
            accept="image/*"
            maxSize={2 * 1024 * 1024}
          />
        )}
      />
    </motion.div>
  );
};