# MaintexAI Voice Agent - Custom Metadata Configuration

## Overview

This document defines the custom metadata fields for the MaintexAI Voice Agent. These metadata fields can be used in the LiveKit Agent Builder's **Advanced** tab to:
1. Add mock values for testing
2. Provide hints to the editor interface
3. Enable dynamic personalization in agent instructions and greetings

According to the [LiveKit documentation](https://docs.livekit.io/agents/start/builder/#variables), metadata is passed as JSON when dispatching the agent and is automatically parsed and made available as variables using the `{{metadata.field_name}}` syntax.

## Metadata Fields Definition

### User Information

#### `user_name`
- **Type**: `string`
- **Description**: The full name of the user interacting with the agent
- **Example Value**: `"John Smith"`
- **Usage**: Personalize greetings and responses
- **Example in Instructions**: `"Hello {{metadata.user_name}}, how can I help you today?"`

#### `user_email`
- **Type**: `string`
- **Description**: The email address of the user
- **Example Value**: `"john.smith@example.com"`
- **Usage**: User identification and account-related queries
- **Example in Instructions**: `"I can see you're logged in as {{metadata.user_email}}"`

#### `user_id`
- **Type**: `string` or `number`
- **Description**: Unique identifier for the user
- **Example Value**: `"12345"` or `12345`
- **Usage**: Internal user tracking and data queries
- **Example in Instructions**: `"Let me check your work orders, user {{metadata.user_id}}"`

#### `user_role`
- **Type**: `string`
- **Description**: The user's role in the organization (e.g., "facilities_manager", "field_technician", "administrator", "hr_manager")
- **Example Value**: `"facilities_manager"`
- **Usage**: Adapt agent behavior and permissions based on role
- **Example in Instructions**: `"As a {{metadata.user_role}}, you have access to..."`

#### `user_department`
- **Type**: `string`
- **Description**: The department the user belongs to
- **Example Value**: `"Maintenance"` or `"HR"` or `"Operations"`
- **Usage**: Filter and contextualize information by department
- **Example in Instructions**: `"I'll help you with {{metadata.user_department}} related tasks"`

### Organization Context

#### `company_name`
- **Type**: `string`
- **Description**: The name of the organization/company
- **Example Value**: `"Acme Facilities Management"`
- **Usage**: Personalize responses with company context
- **Example in Instructions**: `"Welcome to {{metadata.company_name}}'s Maintex Pro assistant"`

#### `company_id`
- **Type**: `string` or `number`
- **Description**: Unique identifier for the company/organization
- **Example Value**: `"comp_001"` or `1`
- **Usage**: Data scoping and organization-specific queries
- **Example in Instructions**: `"Let me access {{metadata.company_name}}'s data"`

### Session Context

#### `session_context`
- **Type**: `string`
- **Description**: The current page or feature the user is viewing
- **Example Value**: `"work_orders"`, `"scheduling"`, `"employees"`, `"dashboard"`
- **Usage**: Provide context-aware assistance
- **Example in Instructions**: `"I see you're working on {{metadata.session_context}}, let me help you with that"`

#### `timezone`
- **Type**: `string`
- **Description**: User's timezone (IANA timezone format)
- **Example Value**: `"America/New_York"` or `"UTC"`
- **Usage**: Schedule-related queries and time-sensitive information
- **Example in Instructions**: `"Based on your timezone ({{metadata.timezone}}), your next scheduled task is..."`

#### `language`
- **Type**: `string`
- **Description**: User's preferred language (ISO 639-1 code)
- **Example Value**: `"en"`, `"ar"`, `"es"`, `"fr"`
- **Usage**: Multilingual support and localization
- **Example in Instructions**: `"I'll respond in {{metadata.language}}"`

### Feature Flags & Permissions

#### `can_create_work_orders`
- **Type**: `boolean`
- **Description**: Whether the user has permission to create work orders
- **Example Value**: `true` or `false`
- **Usage**: Guide users based on their permissions
- **Example in Instructions**: `"{{#if metadata.can_create_work_orders}}You can create work orders by...{{else}}To create work orders, you'll need to contact your administrator{{/if}}"`

#### `can_manage_schedule`
- **Type**: `boolean`
- **Description**: Whether the user can manage team schedules
- **Example Value**: `true` or `false`
- **Usage**: Schedule-related feature access
- **Example in Instructions**: `"{{#if metadata.can_manage_schedule}}I can help you schedule your team{{else}}Schedule management requires additional permissions{{/if}}"`

#### `can_view_reports`
- **Type**: `boolean`
- **Description**: Whether the user can access reports and analytics
- **Example Value**: `true` or `false`
- **Usage**: Report and analytics feature access
- **Example in Instructions**: `"{{#if metadata.can_view_reports}}I can generate reports for you{{else}}Report access is restricted{{/if}}"`

### Location Context (Optional)

#### `user_location`
- **Type**: `string`
- **Description**: User's current location or office location
- **Example Value**: `"New York Office"` or `"Field Site A"`
- **Usage**: Location-specific queries and asset tracking
- **Example in Instructions**: `"I can help you with assets at {{metadata.user_location}}"`

#### `latitude`
- **Type**: `number`
- **Description**: User's current latitude (for field teams)
- **Example Value**: `40.7128`
- **Usage**: Location-based services and tracking
- **Example in Instructions**: `"I see you're at coordinates {{metadata.latitude}}, {{metadata.longitude}}"`

#### `longitude`
- **Type**: `number`
- **Description**: User's current longitude (for field teams)
- **Example Value**: `-74.0060`
- **Usage**: Location-based services and tracking
- **Example in Instructions**: `"I see you're at coordinates {{metadata.latitude}}, {{metadata.longitude}}"`

## Mock Values for Testing

When configuring metadata in the LiveKit Agent Builder's Advanced tab, use these mock values for testing:

```json
{
  "user_name": "John Smith",
  "user_email": "john.smith@example.com",
  "user_id": "12345",
  "user_role": "facilities_manager",
  "user_department": "Maintenance",
  "company_name": "Acme Facilities Management",
  "company_id": "comp_001",
  "session_context": "work_orders",
  "timezone": "America/New_York",
  "language": "en",
  "can_create_work_orders": true,
  "can_manage_schedule": true,
  "can_view_reports": true,
  "user_location": "New York Office",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

## Implementation in Frontend

When dispatching the agent from your React application, pass metadata in the session options:

```javascript
const tokenOptions = {
  agentName: 'agent-MaintexAI',
  metadata: JSON.stringify({
    user_name: user.name,
    user_email: user.email,
    user_id: user.id,
    user_role: user.role,
    user_department: user.department,
    company_name: context?.company?.name,
    company_id: context?.company?.id,
    session_context: currentPage, // e.g., 'work_orders', 'scheduling'
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: i18n.language,
    can_create_work_orders: user.permissions?.canCreateWorkOrders,
    can_manage_schedule: user.permissions?.canManageSchedule,
    can_view_reports: user.permissions?.canViewReports,
    user_location: user.location,
    latitude: coords?.latitude,
    longitude: coords?.longitude,
  })
};

const session = useSession(tokenSource, tokenOptions);
```

## Usage in Agent Instructions

### Basic Variable Usage

```
Hello {{metadata.user_name}}, I'm MaintexAI, your intelligent assistant for {{metadata.company_name}}.
```

### Conditional Logic (if supported)

```
{{#if metadata.can_create_work_orders}}
You have permission to create work orders. Would you like me to guide you through creating one?
{{else}}
To create work orders, you'll need to contact your administrator to grant you the necessary permissions.
{{/if}}
```

### Context-Aware Greetings

```
Welcome back, {{metadata.user_name}}! I see you're working on {{metadata.session_context}} today. 
As a {{metadata.user_role}} in the {{metadata.user_department}} department, I'm here to help you 
with work orders, scheduling, and team management. How can I assist you?
```

### Role-Based Guidance

```
Based on your role as {{metadata.user_role}}, you have access to:
{{#if metadata.can_create_work_orders}}- Creating and managing work orders{{/if}}
{{#if metadata.can_manage_schedule}}- Team scheduling and calendar management{{/if}}
{{#if metadata.can_view_reports}}- Reports and analytics{{/if}}

What would you like to work on today?
```

## Notes

1. **Variable Syntax**: Use `{{metadata.field_name}}` to access metadata values in instructions and greetings
2. **JSON Parsing**: Metadata is automatically parsed as JSON when passed to the agent
3. **Optional Fields**: Not all fields need to be provided—only include what's relevant for your use case
4. **Security**: Never include sensitive information like passwords or API keys in metadata—use Secrets instead
5. **Testing**: Use mock values in the Agent Builder to test how your agent responds to different user contexts

## Best Practices

1. **Start Simple**: Begin with essential fields like `user_name`, `user_role`, and `company_name`
2. **Iterate**: Add more metadata fields as you discover what information improves the agent's responses
3. **Test Variations**: Test with different user roles and permissions to ensure the agent adapts appropriately
4. **Privacy**: Only include metadata that enhances the user experience and is necessary for functionality
5. **Documentation**: Keep this document updated as you add or modify metadata fields
