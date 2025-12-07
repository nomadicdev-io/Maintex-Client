# MaintexAI Voice Agent - Metadata Setup Guide

## Quick Start

This guide will help you configure custom metadata for your MaintexAI Voice Agent in the LiveKit Agent Builder.

## Step 1: Access the Advanced Tab

1. Open your LiveKit Agent Builder
2. Navigate to the **Advanced** tab
3. Find the **Variables and metadata** section

## Step 2: Define Metadata Fields

In the metadata section, you can define the fields that will be available to your agent. You can either:

### Option A: Use the Quick Reference JSON

Copy the structure from `MAINTEX_AI_AGENT_METADATA_QUICK_REFERENCE.json` and paste it into the metadata editor. This provides mock values for testing.

### Option B: Define Fields Manually

Add each field one by one using the interface. The LiveKit Agent Builder will provide hints and autocomplete based on your definitions.

## Step 3: Essential Metadata Fields (Minimum Setup)

For a basic setup, start with these essential fields:

```json
{
  "user_name": "John Smith",
  "user_role": "facilities_manager",
  "company_name": "Acme Facilities Management"
}
```

## Step 4: Update Agent Instructions

Update your agent instructions to use metadata variables. For example:

**Basic Instructions:**
```
You are MaintexAI, the intelligent voice assistant for Maintex Pro. 
Hello {{metadata.user_name}}, I'm here to help you with your business management needs.
```

**Advanced Instructions with Role-Based Adaptation:**
```
You are MaintexAI, the intelligent voice assistant for {{metadata.company_name}}'s Maintex Pro platform.

You are speaking with {{metadata.user_name}}, who is a {{metadata.user_role}} in the {{metadata.user_department}} department.

Adapt your responses based on their role and permissions:
- If they are a facilities_manager, focus on work orders and scheduling
- If they are a field_technician, focus on task assignments and asset tracking
- If they are an administrator, provide access to all platform features

Always greet them by name and acknowledge their role when appropriate.
```

## Step 5: Update Welcome Greeting

Update your welcome greeting to use metadata:

**Basic:**
```
Hello {{metadata.user_name}}! I'm MaintexAI, your assistant for Maintex Pro. How can I help you today?
```

**Advanced:**
```
Hello {{metadata.user_name}}! Welcome to {{metadata.company_name}}'s Maintex Pro assistant. 
I see you're working as a {{metadata.user_role}} in the {{metadata.user_department}} department. 
I'm here to help you with work orders, scheduling, team management, and anything else you need. 
How can I assist you today?
```

## Step 6: Test with Mock Values

1. Use the mock values provided in the metadata definition
2. Test your agent in the preview mode
3. Verify that the agent correctly uses the metadata variables
4. Adjust the instructions and greeting as needed

## Step 7: Connect Frontend (Optional)

When you're ready to connect your frontend, update the `VoiceAgent.jsx` component to pass real metadata:

```javascript
// Get user and context data
const { user } = Route.useRouteContext();
const { context } = Route.useRouteContext();
const { getLocation } = useGeoLocation();

// Get user's location
const [coords, setCoords] = useState(null);
useEffect(() => {
  getLocation().then(setCoords);
}, []);

// Prepare metadata
const metadata = {
  user_name: user?.name || 'User',
  user_email: user?.email || '',
  user_id: user?.id || '',
  user_role: user?.role || 'user',
  user_department: user?.department || '',
  company_name: context?.company?.name || 'Maintex Pro',
  company_id: context?.company?.id || '',
  session_context: 'dashboard', // Update based on current page
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  language: i18n.language || 'en',
  can_create_work_orders: user?.permissions?.canCreateWorkOrders || false,
  can_manage_schedule: user?.permissions?.canManageSchedule || false,
  can_view_reports: user?.permissions?.canViewReports || false,
  ...(coords && {
    latitude: coords.latitude,
    longitude: coords.longitude,
  }),
};

// Update token options
const tokenOptions = {
  agentName: 'agent-MaintexAI',
  metadata: JSON.stringify(metadata),
};

const session = useSession(tokenSource, tokenOptions);
```

## Metadata Field Reference

### Required Fields (Recommended)
- `user_name` - User's name for personalization
- `user_role` - User's role for role-based adaptation
- `company_name` - Company name for context

### Optional but Useful Fields
- `user_email` - User identification
- `user_department` - Department-specific guidance
- `session_context` - Current page/feature context
- `can_create_work_orders` - Permission-based features
- `can_manage_schedule` - Permission-based features
- `can_view_reports` - Permission-based features

### Advanced Fields
- `user_location` - Location-specific queries
- `latitude` / `longitude` - GPS coordinates for field teams
- `timezone` - Time-sensitive scheduling
- `language` - Multilingual support

## Testing Checklist

- [ ] Metadata fields are defined in the Advanced tab
- [ ] Mock values are set for testing
- [ ] Agent instructions use metadata variables (e.g., `{{metadata.user_name}}`)
- [ ] Welcome greeting uses metadata variables
- [ ] Agent preview works with mock metadata
- [ ] Agent responds appropriately to different user roles
- [ ] Frontend passes real metadata when connected (optional)

## Troubleshooting

### Variables Not Working
- Ensure metadata is defined in the Advanced tab
- Check that variable syntax is correct: `{{metadata.field_name}}`
- Verify metadata is passed as valid JSON from frontend

### Agent Not Personalizing
- Check that metadata values are not empty
- Verify the field names match exactly (case-sensitive)
- Test with mock values first before connecting frontend

### Frontend Integration Issues
- Ensure metadata is stringified: `JSON.stringify(metadata)`
- Check that user/context data is available before passing
- Verify the metadata structure matches what's defined in Agent Builder

## Next Steps

1. Review the full metadata documentation: `MAINTEX_AI_AGENT_METADATA.md`
2. Customize metadata fields based on your specific needs
3. Test thoroughly with different user roles and scenarios
4. Deploy and monitor agent performance
5. Iterate based on user feedback

## Resources

- [LiveKit Agent Builder Documentation](https://docs.livekit.io/agents/start/builder/#variables)
- MaintexAI Agent Instructions: `MAINTEX_AI_AGENT_INSTRUCTIONS_CONDENSED.md`
- Full Metadata Reference: `MAINTEX_AI_AGENT_METADATA.md`
- Quick Reference JSON: `MAINTEX_AI_AGENT_METADATA_QUICK_REFERENCE.json`
