"use client";

/**
 * CreateJobForm (Client Component)
 *
 * Form for creating new job applications.
 * Uses 'use client' because it needs:
 * - useState for form state and error handling
 * - Event handlers for form submission
 * - useQueryClient for cache invalidation
 */
import { useState } from 'react';
import { colors, buttonVariants, inputVariants } from '@/lib/design-system';
import { useQueryClient } from '@tanstack/react-query';
import { JobStatus, JobMode, CreateAndEditJobType } from '@/utils/types';

type CreateJobFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

export function CreateJobForm({ onSuccess, onCancel }: CreateJobFormProps) {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);

    // Convert FormData to typed object with default values for hidden fields
    const jobData: CreateAndEditJobType = {
      position: formData.get('position') as string,
      company: formData.get('company') as string,
      location: formData.get('location') as string,
      status: JobStatus.Applied, // Default to "applied"
      mode: JobMode.FullTime, // Default to "full-time"
      salaryRange: '', // Empty by default
      jobUrl: formData.get('jobUrl') as string || '',
      website: '', // Empty by default
      notes: formData.get('notes') as string || '',
    };

    try {
      // Call API route instead of Server Action
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error('Failed to create job');
      }

      // Success! Invalidate queries and switch back to grid
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      onSuccess();
    } catch (error) {
      console.error('Failed to create job:', error);
      setErrors({ submit: 'Failed to create job. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="w-full p-8"
      style={{
        backgroundColor: colors.componentBg,
        minHeight: '600px'
      }}
    >
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        {/* Form Title */}
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: colors.text }}
        >
          Add a New Job Post
        </h2>

        {/* Error message */}
        {errors.submit && (
          <div
            className="p-4 rounded border-2"
            style={{
              backgroundColor: '#FEE2E2',
              borderColor: '#DC2626',
              color: '#991B1B'
            }}
          >
            {errors.submit}
          </div>
        )}

        {/* Job Title */}
        <div>
          <label
            className="block text-sm font-semibold mb-2"
            style={{ color: colors.text }}
          >
            Job Title
          </label>
          <input
            type="text"
            name="position"
            required
            className={inputVariants.default}
            placeholder="Job Title"
          />
        </div>

        {/* URL for Original Posting */}
        <div>
          <label
            className="block text-sm font-semibold mb-2"
            style={{ color: colors.text }}
          >
            URL for Original Posting
          </label>
          <input
            type="url"
            name="jobUrl"
            className={inputVariants.default}
            placeholder="URL for Original Posting"
          />
        </div>

        {/* Company Name */}
        <div>
          <label
            className="block text-sm font-semibold mb-2"
            style={{ color: colors.text }}
          >
            Company Name
          </label>
          <input
            type="text"
            name="company"
            required
            className={inputVariants.default}
            placeholder="Company Name"
          />
        </div>

        {/* Location */}
        <div>
          <label
            className="block text-sm font-semibold mb-2"
            style={{ color: colors.text }}
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            required
            className={inputVariants.default}
            placeholder="Location"
          />
        </div>

        {/* Job Description */}
        <div>
          <label
            className="block text-sm font-semibold mb-2"
            style={{ color: colors.text }}
          >
            Job Description
          </label>
          <textarea
            name="notes"
            rows={6}
            className={inputVariants.default}
            placeholder=""
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className={buttonVariants.outline}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={buttonVariants.primary}
          >
            {isSubmitting ? 'Saving...' : 'Save Job'}
          </button>
        </div>
      </form>
    </div>
  );
}
