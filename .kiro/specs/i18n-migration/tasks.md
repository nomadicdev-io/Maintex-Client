# Implementation Plan: i18n Migration

- [ ] 1. Audit and prepare translation structure
  - Scan all components in `/src/components/`, `/src/routes/`, and `/src/store/` for static text strings
  - Create comprehensive list of text strings to migrate organized by component
  - Design translation key naming structure following kebab-case convention with dot notation namespacing
  - Create initial English translation file structure with organized sections (common, auth, dashboard, profile, forms, validation, etc.)
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ] 2. Populate translation files with extracted strings
  - Extract all static text from components and add to English translation file (`en.json`)
  - Translate all English strings to Arabic (`ar.json`)
  - Translate all English strings to Spanish (`es.json`)
  - Translate all English strings to French (`fr.json`)
  - Translate all English strings to Russian (`ru.json`)
  - Translate all English strings to Italian (`it.json`)
  - Validate JSON structure of all translation files
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 2.1 Write property test for translation key consistency
  - **Property 1: Translation key consistency across language files**
  - **Validates: Requirements 3.1**

- [ ] 2.2 Write property test for translation file structure
  - **Property 2: Translation file structure validity**
  - **Validates: Requirements 3.4**

- [ ] 2.3 Write property test for translation key preservation
  - **Property 3: Translation key preservation**
  - **Validates: Requirements 3.5**

- [ ] 3. Migrate common form components
  - Update `InputField` component in `/src/components/ui/FormComponent.jsx` to use `useTranslation` hook
  - Update `InputSelect` component to use translated labels and placeholders
  - Update `InputCountry` component to use translated labels
  - Update `InputPhone` component to use translated labels
  - Update `TextareaField` component to use translated labels and placeholders
  - Update `DragFileUploader` component to use translated text for drag-drop messages, helper text, and error messages
  - Update `AttachmentUploader` component to use translated labels and error messages
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 6.1, 6.2, 6.5_

- [ ] 3.1 Write unit tests for form component translations
  - Test that form components render with translated text
  - Test that error messages are translated
  - Test that placeholder text is translated
  - _Requirements: 6.1, 6.2, 6.4, 6.5_

- [ ] 4. Migrate authentication components
  - Update `LoginForm.jsx` to use `useTranslation` hook for all static text
  - Replace hardcoded text in form labels, placeholders, buttons, and titles
  - Update validation error messages to use translation keys
  - Update `TwoFactorForm` component within LoginForm to use translations
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 6.1, 6.2, 6.3, 6.4_

- [ ] 4.1 Migrate SignUpForm component
  - Update `SignUpForm.jsx` to use `useTranslation` hook
  - Replace all static text with translation keys
  - Update validation messages
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 6.1, 6.2, 6.3, 6.4_

- [ ] 4.2 Migrate ForgotPasswordForm component
  - Update `ForgotPasswordForm.jsx` to use `useTranslation` hook
  - Replace all static text with translation keys
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 6.1, 6.2, 6.3_

- [ ] 4.3 Migrate RestPasswordForm component
  - Update `RestPasswordForm.jsx` to use `useTranslation` hook
  - Replace all static text with translation keys
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 6.1, 6.2, 6.3_

- [ ] 4.4 Migrate VerifyEmail component
  - Update `VerifyEmail.jsx` to use `useTranslation` hook
  - Replace all static text with translation keys
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 4.5 Write integration tests for authentication flow translations
  - Test LoginForm displays translated text in all languages
  - Test SignUpForm displays translated text
  - Test validation messages are translated
  - _Requirements: 9.1, 9.2, 9.4_

- [ ] 5. Migrate navigation and layout components
  - Complete migration of `/src/store/nav.jsx` (already partially done, ensure all labels use translation keys)
  - Update `DashboardBanner.jsx` to use `useTranslation` hook for title and description props
  - Verify navigation structure remains functional after translation
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 7.1, 7.3, 7.4, 7.5_

- [ ] 5.1 Write integration tests for navigation translations
  - Test that navigation items are translated
  - Test that navigation links remain functional
  - Test language switching updates navigation text
  - _Requirements: 7.5, 9.5_

- [ ] 6. Migrate profile settings components
  - Update `ProfileSettings.jsx` to use `useTranslation` hook for tab labels and title
  - Update `GeneralSettings.jsx` to use translations
  - Update `DriveSettings.jsx` to use translations
  - Update `ContactSettings.jsx` to use translations
  - Update `SecuritySettings.jsx` to use translations
  - Update `NotificationsSettings.jsx` to use translations
  - Update `RecentActivitySettings.jsx` to use translations
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 7.4_

- [ ] 7. Migrate toast notifications and feedback messages
  - Identify all `toast.success()`, `toast.error()`, `toast.warning()`, and `toast.info()` calls throughout the codebase
  - Replace hardcoded messages with translation keys
  - Update loading state messages to use translations
  - _Requirements: 4.1, 4.2, 4.3, 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 8. Migrate remaining UI components
  - Scan `/src/components/ui/` for any remaining components with static text
  - Update components like `CustomTabs.jsx`, `DataField.jsx`, and others as needed
  - Replace any hardcoded text with translation keys
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 9. Migrate route components
  - Scan `/src/routes/` directory for components with static text
  - Update route components to use `useTranslation` hook
  - Replace page titles, descriptions, and other static text
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 10. Handle dynamic text with interpolation
  - Identify text that contains dynamic values (user names, counts, dates, etc.)
  - Update translation keys to use interpolation syntax with `{{variableName}}`
  - Update component code to pass variable values to `t()` function
  - Test interpolation works correctly in all languages
  - _Requirements: 5.1, 5.2, 5.3_

- [ ] 10.1 Write unit tests for interpolation
  - Test that interpolation works with various variable values
  - Test that missing variables are handled gracefully
  - _Requirements: 5.1, 5.2, 5.3_

- [ ] 11. Handle pluralization
  - Identify text that changes based on count (e.g., "1 item" vs "2 items")
  - Update translation keys to use i18next plural forms with `_one`, `_other` suffixes
  - Update component code to pass count values
  - Test pluralization works correctly in all languages
  - _Requirements: 5.4_

- [ ] 12. Handle complex HTML with Trans component
  - Identify text that contains HTML formatting or links
  - Import and use `Trans` component from react-i18next
  - Update translation keys to preserve HTML structure
  - Test that links and formatting work correctly
  - _Requirements: 5.5_

- [ ] 13. Verify and test language switching
  - Test application loads correctly in all 6 languages (en, ar, es, fr, ru, it)
  - Test language switching updates all visible text
  - Test fallback to English when translations are missing
  - Verify no hardcoded English text remains visible
  - Test forms display translated validation messages
  - Test navigation items are translated
  - Test toast notifications are translated
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ] 13.1 Write integration tests for language switching
  - Test switching between all 6 languages
  - Test fallback behavior when translations are missing
  - Test that all UI elements update when language changes
  - _Requirements: 9.1, 9.2, 9.3_

- [ ] 14. Verify accessibility and RTL support
  - Test that ARIA labels are translated
  - Test that alt text for images is translated
  - Test Arabic language displays correctly in RTL mode
  - Verify keyboard navigation labels are translated
  - Test screen reader compatibility with translated text
  - _Requirements: 9.1, 9.2_

- [ ] 15. Create i18n documentation
  - Create developer guidelines for adding new translations
  - Document translation key naming conventions
  - Provide code examples for common patterns (basic translation, interpolation, pluralization, Trans component)
  - Document how to add new languages
  - Update project README with i18n information
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ] 16. Final verification and cleanup
  - Run all unit tests and property-based tests
  - Run all integration tests
  - Perform manual testing in all 6 languages
  - Fix any issues discovered during testing
  - Remove any commented-out hardcoded text
  - Ensure all translation files are properly formatted
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_
