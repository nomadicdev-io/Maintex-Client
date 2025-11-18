# Requirements Document

## Introduction

This specification defines the requirements for migrating all static text strings in the Maintex Pro application to use react-i18next translations. The application currently has react-i18next configured with support for 6 languages (English, Arabic, Spanish, French, Russian, and Italian), but most components still contain hardcoded English text strings. This migration will enable full internationalization support across the entire application.

## Glossary

- **i18n**: Internationalization - the process of designing software to support multiple languages
- **Translation Key**: A unique identifier used to retrieve translated text from translation files
- **Translation File**: JSON files containing key-value pairs of translation keys and their translated text (located in `/src/lang/locals/*.json`)
- **useTranslation Hook**: React hook from react-i18next that provides the `t()` function for translating text
- **Static Text String**: Hardcoded text in components that needs to be replaced with translation keys
- **Maintex Pro**: The business management platform being internationalized

## Requirements

### Requirement 1

**User Story:** As a developer, I want to identify all static text strings in the codebase, so that I can systematically migrate them to use i18n translations.

#### Acceptance Criteria

1. WHEN scanning the codebase THEN the system SHALL identify all JSX text content that contains user-facing strings
2. WHEN scanning the codebase THEN the system SHALL identify all string literals used in props like `label`, `placeholder`, `title`, `alt`, and `aria-label`
3. WHEN scanning the codebase THEN the system SHALL identify all hardcoded error messages and validation messages
4. WHEN scanning the codebase THEN the system SHALL exclude technical strings like CSS classes, API endpoints, and configuration values
5. WHEN scanning the codebase THEN the system SHALL prioritize components in `/src/components/`, `/src/routes/`, and `/src/store/` directories

### Requirement 2

**User Story:** As a developer, I want to create meaningful translation keys, so that translations are maintainable and organized.

#### Acceptance Criteria

1. WHEN creating translation keys THEN the system SHALL use kebab-case naming convention (e.g., `login-form-email-label`)
2. WHEN creating translation keys THEN the system SHALL organize keys by feature or component context (e.g., `auth.login.email-label`)
3. WHEN creating translation keys THEN the system SHALL ensure keys are descriptive and indicate their usage context
4. WHEN creating translation keys THEN the system SHALL avoid overly generic keys like `text1` or `label2`
5. WHEN creating translation keys THEN the system SHALL maintain consistency with existing translation key patterns in the codebase

### Requirement 3

**User Story:** As a developer, I want to update all translation JSON files, so that all supported languages have the new translation keys.

#### Acceptance Criteria

1. WHEN adding new translation keys THEN the system SHALL update all six language files (`en.json`, `ar.json`, `es.json`, `fr.json`, `ru.json`, `it.json`)
2. WHEN adding English translations THEN the system SHALL use the original static text as the translation value
3. WHEN adding non-English translations THEN the system SHALL provide appropriate translations for Arabic, Spanish, French, Russian, and Italian
4. WHEN organizing translations THEN the system SHALL maintain the nested structure using dot notation for namespacing
5. WHEN updating translation files THEN the system SHALL preserve existing translations and only add new keys

### Requirement 4

**User Story:** As a developer, I want to update React components to use the useTranslation hook, so that they display translated text.

#### Acceptance Criteria

1. WHEN updating a component THEN the system SHALL import the `useTranslation` hook from `react-i18next`
2. WHEN updating a component THEN the system SHALL call `useTranslation()` to get the `t` function
3. WHEN replacing static text THEN the system SHALL replace hardcoded strings with `t('translation-key')` calls
4. WHEN replacing text in JSX THEN the system SHALL use `{t('key')}` syntax within JSX expressions
5. WHEN replacing text in props THEN the system SHALL use `t('key')` directly in prop values

### Requirement 5

**User Story:** As a developer, I want to handle dynamic text with interpolation, so that translations can include variable values.

#### Acceptance Criteria

1. WHEN text contains dynamic values THEN the system SHALL use i18next interpolation syntax with double curly braces
2. WHEN calling the translation function THEN the system SHALL pass an object with variable values as the second parameter
3. WHEN defining translations with variables THEN the system SHALL use descriptive variable names like `{{userName}}` or `{{count}}`
4. WHEN text contains pluralization THEN the system SHALL use i18next plural forms with `_one`, `_other` suffixes
5. WHEN text contains formatting THEN the system SHALL preserve HTML structure using the `Trans` component for complex cases

### Requirement 6

**User Story:** As a developer, I want to migrate form components systematically, so that all form labels, placeholders, and validation messages are translated.

#### Acceptance Criteria

1. WHEN updating form components THEN the system SHALL translate all field labels
2. WHEN updating form components THEN the system SHALL translate all placeholder text
3. WHEN updating form components THEN the system SHALL translate all button text
4. WHEN updating form components THEN the system SHALL translate all validation error messages
5. WHEN updating form components THEN the system SHALL translate all helper text and descriptions

### Requirement 7

**User Story:** As a developer, I want to migrate navigation and menu items, so that the application navigation is fully internationalized.

#### Acceptance Criteria

1. WHEN updating navigation THEN the system SHALL translate all sidebar menu labels
2. WHEN updating navigation THEN the system SHALL translate all breadcrumb text
3. WHEN updating navigation THEN the system SHALL translate all dropdown menu items
4. WHEN updating navigation THEN the system SHALL translate all tab labels
5. WHEN updating navigation THEN the system SHALL ensure navigation structure remains functional after translation

### Requirement 8

**User Story:** As a developer, I want to migrate UI feedback messages, so that toasts, alerts, and notifications are translated.

#### Acceptance Criteria

1. WHEN displaying success messages THEN the system SHALL use translated text from translation files
2. WHEN displaying error messages THEN the system SHALL use translated text from translation files
3. WHEN displaying warning messages THEN the system SHALL use translated text from translation files
4. WHEN displaying info messages THEN the system SHALL use translated text from translation files
5. WHEN displaying loading states THEN the system SHALL use translated text from translation files

### Requirement 9

**User Story:** As a developer, I want to verify the migration, so that I can ensure all text is properly translated and the application functions correctly.

#### Acceptance Criteria

1. WHEN testing the application THEN the system SHALL display all text in the selected language
2. WHEN switching languages THEN the system SHALL update all visible text to the new language
3. WHEN missing translations occur THEN the system SHALL fall back to English text
4. WHEN testing forms THEN the system SHALL display translated validation messages
5. WHEN testing navigation THEN the system SHALL display translated menu items and labels

### Requirement 10

**User Story:** As a developer, I want to document the i18n implementation, so that future developers can add new translations correctly.

#### Acceptance Criteria

1. WHEN adding new components THEN developers SHALL follow the established translation key naming conventions
2. WHEN adding new text THEN developers SHALL add translations to all six language files
3. WHEN using the useTranslation hook THEN developers SHALL follow the documented patterns
4. WHEN handling dynamic content THEN developers SHALL use interpolation correctly
5. WHEN the migration is complete THEN the system SHALL provide examples and guidelines for future i18n work
