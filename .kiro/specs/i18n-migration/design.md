# Design Document: i18n Migration

## Overview

This design document outlines the approach for migrating all static text strings in the Maintex Pro application to use react-i18next translations. The application already has i18next configured with support for 6 languages (English, Arabic, Spanish, French, Russian, and Italian), but most components contain hardcoded English text. This migration will enable full internationalization support across the entire application.

The migration will be performed systematically, component by component, ensuring that all user-facing text is extracted into translation files while maintaining the application's functionality and user experience.

## Architecture

### Current State

The application currently has:
- i18next configured in `/src/lang/index.js`
- Translation files for 6 languages in `/src/lang/locals/*.json`
- Minimal existing translations (primarily navigation items)
- Most components with hardcoded English text strings
- No consistent use of the `useTranslation` hook

### Target State

After migration, the application will have:
- All user-facing text extracted to translation files
- Consistent use of `useTranslation` hook across all components
- Comprehensive translation keys organized by feature/component
- All 6 language files updated with new translations
- Documentation for future i18n development

### Migration Strategy

The migration will follow a phased approach:

1. **Audit Phase**: Identify all static text strings in components
2. **Key Design Phase**: Create translation key structure and naming conventions
3. **Translation Phase**: Extract strings and populate translation files
4. **Component Update Phase**: Update components to use `useTranslation` hook
5. **Verification Phase**: Test language switching and fallback behavior
6. **Documentation Phase**: Create guidelines for future i18n work

## Components and Interfaces

### Translation Key Structure

Translation keys will be organized using dot notation for namespacing:

```
{feature}.{component}.{element}-{type}
```

Examples:
- `auth.login.email-label` - Login form email field label
- `auth.login.password-placeholder` - Login form password placeholder
- `auth.login.submit-button` - Login form submit button text
- `auth.login.forgot-password-link` - Forgot password link text
- `dashboard.banner.welcome-title` - Dashboard welcome title
- `profile.settings.general-tab` - Profile settings general tab label
- `common.buttons.save` - Common save button text
- `common.buttons.cancel` - Common cancel button text
- `common.messages.success` - Common success message
- `common.errors.required-field` - Common required field error
- `validation.email-invalid` - Email validation error
- `validation.password-too-short` - Password too short error

### Component Pattern

All components that display user-facing text will follow this pattern:

```jsx
import { useTranslation } from 'react-i18next'

export default function MyComponent() {
  const { t } = useTranslation()
  
  return (
    <div>
      <h1>{t('feature.component.title')}</h1>
      <p>{t('feature.component.description')}</p>
      <Button>{t('common.buttons.submit')}</Button>
    </div>
  )
}
```

### Interpolation Pattern

For dynamic text with variables:

```jsx
// Translation file
{
  "welcome-message": "Welcome back, {{userName}}!"
}

// Component
<p>{t('dashboard.welcome-message', { userName: user.name })}</p>
```

### Pluralization Pattern

For text that changes based on count:

```jsx
// Translation file
{
  "items-count_one": "{{count}} item",
  "items-count_other": "{{count}} items"
}

// Component
<p>{t('common.items-count', { count: items.length })}</p>
```

### Complex HTML Pattern

For text with HTML formatting, use the `Trans` component:

```jsx
import { Trans } from 'react-i18next'

// Translation file
{
  "terms-agreement": "I agree to the <1>Terms of Service</1> and <3>Privacy Policy</3>"
}

// Component
<Trans i18nKey="auth.terms-agreement">
  I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
</Trans>
```

## Data Models

### Translation File Structure

Each language file (`/src/lang/locals/*.json`) will follow this structure:

```json
{
  "translation": {
    "common": {
      "buttons": {
        "save": "Save",
        "cancel": "Cancel",
        "submit": "Submit",
        "delete": "Delete",
        "edit": "Edit"
      },
      "messages": {
        "success": "Operation completed successfully",
        "error": "An error occurred",
        "loading": "Loading..."
      }
    },
    "auth": {
      "login": {
        "title": "Welcome back!",
        "email-label": "Email",
        "email-placeholder": "Enter your email",
        "password-label": "Password",
        "password-placeholder": "Enter your password",
        "submit-button": "Login to Maintex Pro",
        "forgot-password-link": "Forgot Password?"
      },
      "signup": {
        "title": "Create Account",
        "email-label": "Email",
        "password-label": "Password"
      }
    },
    "dashboard": {
      "banner": {
        "welcome-title": "Dashboard"
      }
    },
    "profile": {
      "settings": {
        "title": "User Settings",
        "general-tab": "General",
        "drive-tab": "Drive",
        "contact-tab": "Contact",
        "security-tab": "Security",
        "notifications-tab": "Notifications",
        "recent-activity-tab": "Recent Activity"
      }
    },
    "validation": {
      "email-invalid": "Invalid email address",
      "email-required": "Email is required",
      "email-too-short": "Email must be at least 3 characters",
      "email-too-long": "Email must be less than 255 characters",
      "password-required": "Password is required",
      "password-too-short": "Password must be at least 3 characters",
      "password-too-long": "Password must be less than 255 characters"
    },
    "forms": {
      "file-upload": {
        "drag-drop-text": "Drag 'n' drop image here, or click to select files",
        "max-size-text": "Max file size is 5MB. Only png, jpg, jpeg, mp4, wmv, mpeg, pdf, and docx files are allowed.",
        "invalid-type": "Invalid file type",
        "size-too-large": "File size is too large",
        "upload-success": "File uploaded successfully",
        "upload-failed": "Failed to upload file",
        "remove-file": "Remove file"
      }
    }
  }
}
```

### Component Categories

Components will be categorized for systematic migration:

1. **Authentication Components** (`/src/components/forms/`)
   - LoginForm.jsx
   - SignUpForm.jsx
   - ForgotPasswordForm.jsx
   - RestPasswordForm.jsx
   - VerifyEmail.jsx

2. **Form Components** (`/src/components/ui/FormComponent.jsx`)
   - InputField
   - InputSelect
   - InputCountry
   - InputPhone
   - TextareaField
   - DragFileUploader
   - AttachmentUploader

3. **Layout Components** (`/src/components/sections/`)
   - DashboardBanner.jsx
   - Profile settings components

4. **Navigation** (`/src/store/nav.jsx`)
   - Already partially migrated, needs completion

5. **UI Components** (`/src/components/ui/`)
   - Various reusable UI components with text

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Translation key consistency across language files

*For any* translation key that exists in the English translation file, that same key should exist in all other language files (Arabic, Spanish, French, Russian, Italian).

**Validates: Requirements 3.1**

### Property 2: Translation file structure validity

*For any* translation file, the JSON structure should be valid and maintain proper nesting with the "translation" root key.

**Validates: Requirements 3.4**

### Property 3: Translation key preservation

*For any* existing translation key before migration, that key should still exist after adding new translations (no keys should be deleted).

**Validates: Requirements 3.5**

## Error Handling

### Missing Translation Keys

When a translation key is missing:
- i18next will fall back to the English translation (configured as `fallbackLng: 'en'`)
- In development, missing keys can be logged for debugging
- The key itself will be displayed if no fallback is available

### Invalid Interpolation

When interpolation variables are missing:
- i18next will display the translation with empty values for missing variables
- Console warnings can be enabled in development mode

### Language Switching Errors

If language switching fails:
- The application will remain in the current language
- An error message will be displayed to the user
- The language preference in localStorage will not be updated

## Testing Strategy

### Unit Testing

Unit tests will verify:
- Translation key existence in all language files
- JSON structure validity of translation files
- Proper use of `useTranslation` hook in components
- Interpolation with various variable values
- Fallback behavior when translations are missing

Example unit test:

```javascript
import { describe, it, expect } from 'vitest'
import en from '@/lang/locals/en.json'
import ar from '@/lang/locals/ar.json'
import es from '@/lang/locals/es.json'
import fr from '@/lang/locals/fr.json'
import ru from '@/lang/locals/ru.json'
import it from '@/lang/locals/it.json'

describe('Translation Files', () => {
  it('should have the same keys in all language files', () => {
    const enKeys = Object.keys(en.translation)
    const arKeys = Object.keys(ar.translation)
    const esKeys = Object.keys(es.translation)
    const frKeys = Object.keys(fr.translation)
    const ruKeys = Object.keys(ru.translation)
    const itKeys = Object.keys(it.translation)
    
    expect(arKeys).toEqual(enKeys)
    expect(esKeys).toEqual(enKeys)
    expect(frKeys).toEqual(enKeys)
    expect(ruKeys).toEqual(enKeys)
    expect(itKeys).toEqual(enKeys)
  })
})
```

### Integration Testing

Integration tests will verify:
- Language switching updates all visible text
- Navigation remains functional after translation
- Forms display translated validation messages
- Toast notifications display translated messages
- The application loads correctly in each supported language

Example integration test:

```javascript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/lang'
import LoginForm from '@/components/forms/LoginForm'

describe('LoginForm i18n', () => {
  it('should display translated text in English', () => {
    i18n.changeLanguage('en')
    render(
      <I18nextProvider i18n={i18n}>
        <LoginForm />
      </I18nextProvider>
    )
    
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument()
  })
  
  it('should display translated text in Spanish', () => {
    i18n.changeLanguage('es')
    render(
      <I18nextProvider i18n={i18n}>
        <LoginForm />
      </I18nextProvider>
    )
    
    expect(screen.getByText(/Bienvenido/i)).toBeInTheDocument()
  })
})
```

### Manual Testing Checklist

After migration, manually verify:
- [ ] All pages display correctly in all 6 languages
- [ ] Language switching works from the UI
- [ ] No hardcoded English text remains visible
- [ ] Forms validate with translated error messages
- [ ] Navigation items are translated
- [ ] Toast notifications are translated
- [ ] Loading states show translated text
- [ ] Placeholder text is translated
- [ ] Button labels are translated
- [ ] Alt text for images is translated
- [ ] ARIA labels are translated for accessibility

### Property-Based Testing

Property-based tests will be implemented using **fast-check** (for JavaScript/TypeScript). Each property-based test will run a minimum of 100 iterations.

Property-based tests will verify:
- Translation key consistency across all language files
- JSON structure validity
- No translation keys are lost during updates

Example property-based test:

```javascript
import { describe, it } from 'vitest'
import fc from 'fast-check'
import en from '@/lang/locals/en.json'
import ar from '@/lang/locals/ar.json'
import es from '@/lang/locals/es.json'
import fr from '@/lang/locals/fr.json'
import ru from '@/lang/locals/ru.json'
import it from '@/lang/locals/it.json'

/**
 * Feature: i18n-migration, Property 1: Translation key consistency across language files
 * For any translation key that exists in the English translation file, 
 * that same key should exist in all other language files
 */
describe('Property: Translation key consistency', () => {
  it('should have all English keys in other language files', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...getAllKeys(en.translation)),
        (key) => {
          const hasInAr = hasKey(ar.translation, key)
          const hasInEs = hasKey(es.translation, key)
          const hasInFr = hasKey(fr.translation, key)
          const hasInRu = hasKey(ru.translation, key)
          const hasInIt = hasKey(it.translation, key)
          
          return hasInAr && hasInEs && hasInFr && hasInRu && hasInIt
        }
      ),
      { numRuns: 100 }
    )
  })
})

function getAllKeys(obj, prefix = '') {
  let keys = []
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys = keys.concat(getAllKeys(obj[key], fullKey))
    } else {
      keys.push(fullKey)
    }
  }
  return keys
}

function hasKey(obj, path) {
  const keys = path.split('.')
  let current = obj
  for (const key of keys) {
    if (current[key] === undefined) return false
    current = current[key]
  }
  return true
}
```

## Implementation Phases

### Phase 1: Setup and Audit (Foundation)

- Review existing i18next configuration
- Audit all components for static text strings
- Create comprehensive list of text to migrate
- Design translation key structure and naming conventions

### Phase 2: Translation File Preparation

- Create organized structure in English translation file
- Extract all static text strings to English translations
- Translate strings to Arabic, Spanish, French, Russian, and Italian
- Validate JSON structure of all translation files

### Phase 3: Component Migration

Migrate components in this order:

1. **Common/Reusable Components First**
   - Form components (InputField, InputSelect, etc.)
   - Button components
   - Common UI elements

2. **Authentication Flow**
   - LoginForm
   - SignUpForm
   - ForgotPasswordForm
   - RestPasswordForm
   - VerifyEmail

3. **Navigation and Layout**
   - Complete nav.jsx migration
   - DashboardBanner
   - Sidebar components
   - Header components

4. **Feature Components**
   - Profile settings
   - Dashboard sections
   - Other feature-specific components

5. **Remaining Components**
   - Any remaining components with static text

### Phase 4: Verification and Testing

- Run unit tests for translation key consistency
- Run integration tests for language switching
- Perform manual testing in all 6 languages
- Fix any issues discovered during testing

### Phase 5: Documentation

- Create i18n development guidelines
- Document translation key naming conventions
- Provide examples for common patterns
- Update project README with i18n information

## Migration Guidelines

### Do's

- ✅ Use descriptive, context-aware translation keys
- ✅ Organize keys by feature/component
- ✅ Update all 6 language files simultaneously
- ✅ Use interpolation for dynamic values
- ✅ Test language switching after each component migration
- ✅ Preserve existing translations
- ✅ Use `Trans` component for complex HTML
- ✅ Add comments in translation files for context when needed

### Don'ts

- ❌ Don't use generic keys like `text1`, `label2`
- ❌ Don't translate technical strings (CSS classes, API endpoints)
- ❌ Don't delete existing translation keys
- ❌ Don't hardcode text in components after migration
- ❌ Don't forget to translate alt text and ARIA labels
- ❌ Don't use string concatenation for dynamic text
- ❌ Don't skip testing in all supported languages

## Future Considerations

### Adding New Languages

To add a new language:
1. Create new JSON file in `/src/lang/locals/`
2. Copy structure from `en.json`
3. Translate all values
4. Add language to `supportedLngs` in i18next config
5. Update language selector UI

### Translation Management

Consider implementing:
- Translation management platform (e.g., Lokalise, Crowdin)
- Automated translation key extraction tools
- CI/CD checks for translation completeness
- Translation memory for consistency

### Performance Optimization

For large applications:
- Implement lazy loading of translation files
- Use namespaces to split translations by feature
- Consider using i18next-http-backend for dynamic loading

## Accessibility Considerations

Ensure all translated text maintains:
- Proper ARIA labels
- Screen reader compatibility
- Appropriate text alternatives for images
- Keyboard navigation labels
- Form field labels and descriptions

## RTL (Right-to-Left) Support

For Arabic language support:
- Ensure CSS supports RTL layout
- Test UI components in RTL mode
- Verify text alignment and directionality
- Check icon and image positioning

## Conclusion

This migration will transform Maintex Pro into a fully internationalized application, enabling users to interact with the platform in their preferred language. The systematic approach ensures consistency, maintainability, and a solid foundation for future i18n development.
