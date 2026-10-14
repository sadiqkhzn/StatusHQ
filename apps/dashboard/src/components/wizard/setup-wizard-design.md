# StatusHQ 2-Minute Setup Wizard Architecture

## Overview

The 2-minute setup wizard is StatusHQ's core differentiating feature, designed to get non-technical founders monitoring their APIs instantly without requiring deep technical knowledge.

## Design Principles

### For Non-Technical Founders
- **Business Language**: Use terms like "website", "service", "uptime" instead of "endpoint", "API", "status codes"
- **Visual Guidance**: Screenshots, tooltips, and visual indicators throughout
- **Smart Defaults**: Intelligent defaults that work for 80% of use cases
- **Progressive Disclosure**: Show complexity only when needed
- **Confidence Building**: Show progress, explain what's happening, celebrate success

### Technical Architecture
- **React Hook Form**: Form validation and state management
- **Multi-step Process**: 4-6 steps with clear progress indication
- **Auto-discovery**: Intelligent service detection where possible
- **Real-time Validation**: Test connections as user inputs them
- **Graceful Fallback**: Manual setup options when auto-discovery fails

## Wizard Flow Design

### Step 1: Welcome & Context (30 seconds)
**Goal**: Build confidence and set expectations

**UI Components**:
```tsx
<WelcomeStep>
  <StatusHQBranding />
  <ProgressIndicator step={1} total={5} />
  <Headline>Let's get your business protected in 2 minutes</Headline>
  <SubHeadline>We'll monitor your website and APIs so you know immediately when something's wrong</SubHeadline>
  <FeatureHighlights>
    - Instant alerts when your site goes down
    - Professional status page for customers
    - No technical setup required
  </FeatureHighlights>
  <ContinueButton>Start Protecting My Business</ContinueButton>
</WelcomeStep>
```

**Backend**: No API calls, pure UI

### Step 2: Business Context (30 seconds)
**Goal**: Understand the user's business to provide relevant defaults

**UI Components**:
```tsx
<BusinessContextStep>
  <FormField>
    <Label>What's your business name?</Label>
    <Input placeholder="Acme Corp" />
    <HelpText>This will appear on your status page</HelpText>
  </FormField>
  
  <FormField>
    <Label>What type of business is this?</Label>
    <Select options={[
      "SaaS/Web App", 
      "E-commerce", 
      "Blog/Content Site", 
      "API Service",
      "Other"
    ]} />
  </FormField>
  
  <FormField>
    <Label>Your main website URL</Label>
    <Input placeholder="https://acmecorp.com" />
    <AutoDetectButton>Auto-detect services</AutoDetectButton>
  </FormField>
</BusinessContextStep>
```

**Backend APIs**:
- `POST /api/wizard/business-context` - Save business info
- `POST /api/wizard/auto-detect` - Scan domain for services

### Step 3: Service Discovery (45 seconds)
**Goal**: Identify what needs monitoring with minimal user input

**Smart Detection Logic**:
```typescript
// Auto-discovery service
async function detectServices(domain: string) {
  const services = [];
  
  // Check main website
  services.push({
    name: "Main Website",
    url: domain,
    type: "website",
    method: "GET"
  });
  
  // Check common API patterns
  const apiChecks = [
    `${domain}/api/health`,
    `${domain}/api/status`, 
    `${domain}/health`,
    `api.${domain}/health`
  ];
  
  for (const url of apiChecks) {
    if (await isEndpointReachable(url)) {
      services.push({
        name: "API Service",
        url,
        type: "api",
        method: "GET"
      });
    }
  }
  
  return services;
}
```

**UI Components**:
```tsx
<ServiceDiscoveryStep>
  <DetectedServices>
    <ServiceCard 
      name="Main Website" 
      url="https://acmecorp.com"
      status="healthy"
      checked={true}
      confidence="high"
    />
    <ServiceCard 
      name="API Service" 
      url="https://api.acmecorp.com/health"
      status="healthy" 
      checked={true}
      confidence="medium"
    />
  </DetectedServices>
  
  <ManualAddSection>
    <AddServiceButton>Add Another Service</AddServiceButton>
    <HelpText>We found these services. You can add more or remove any you don't want to monitor.</HelpText>
  </ManualAddSection>
</ServiceDiscoveryStep>
```

**Backend APIs**:
- `POST /api/wizard/detect-services` - Auto-discover services
- `POST /api/wizard/validate-endpoint` - Test individual endpoints

### Step 4: Notification Preferences (30 seconds)
**Goal**: Set up alerts without overwhelming with options

**UI Components**:
```tsx
<NotificationStep>
  <PrimaryNotification>
    <Label>How should we notify you when something's wrong?</Label>
    <NotificationMethodSelector>
      <Option value="email" selected>
        <EmailIcon />
        Email me at {userEmail}
      </Option>
      <Option value="slack">
        <SlackIcon />
        Send to my Slack
      </Option>
    </NotificationMethodSelector>
  </PrimaryNotification>
  
  <SlackIntegration show={notificationMethod === "slack"}>
    <SlackConnectButton>Connect to Slack</SlackConnectButton>
    <ChannelSelector />
  </SlackIntegration>
  
  <AdvancedOptions collapsed>
    <SMS />
    <AdditionalEmails />
    <NotificationTiming />
  </AdvancedOptions>
</NotificationStep>
```

**Backend APIs**:
- `POST /api/wizard/setup-notifications` - Configure alert methods
- `GET /api/integrations/slack/oauth` - Slack OAuth flow

### Step 5: Create Status Page (15 seconds)
**Goal**: Set up customer-facing status page with minimal effort

**UI Components**:
```tsx
<StatusPageStep>
  <Preview>
    <StatusPagePreview 
      businessName={businessName}
      services={selectedServices}
      theme="default"
    />
  </Preview>
  
  <Configuration>
    <FormField>
      <Label>Status Page URL</Label>
      <URLInput>
        <prefix>status.</prefix>
        <input value={businessSlug} />
        <suffix>.statushq.com</suffix>
      </URLInput>
    </FormField>
    
    <FormField>
      <Label>Page Title</Label>
      <Input value={`${businessName} Status`} />
    </FormField>
    
    <FormField>
      <Label>Logo (Optional)</Label>
      <LogoUploader />
    </FormField>
  </Configuration>
</StatusPageStep>
```

**Backend APIs**:
- `POST /api/wizard/create-status-page` - Generate status page
- `POST /api/wizard/upload-logo` - Handle logo upload

### Step 6: Success & Next Steps (30 seconds)
**Goal**: Celebrate success and guide towards ongoing value

**UI Components**:
```tsx
<SuccessStep>
  <CelebrationAnimation />
  <SuccessMessage>
    🎉 Your monitoring is now active!
  </SuccessMessage>
  
  <SetupSummary>
    <SummaryCard>
      <MonitorCount>{serviceCount} services being monitored</MonitorCount>
      <NotificationSummary>Alerts going to {notificationMethod}</NotificationSummary>
      <StatusPageLink>Status page: {statusPageUrl}</StatusPageLink>
    </SummaryCard>
  </SetupSummary>
  
  <NextSteps>
    <NextStepCard>
      <ShareStatusPage />
      Share your status page with customers
    </NextStepCard>
    <NextStepCard>
      <ViewDashboard />
      See your monitoring dashboard
    </NextStepCard>
    <NextStepCard>
      <InviteTeam />
      Invite team members
    </NextStepCard>
  </NextSteps>
  
  <CTAButton>Go to Dashboard</CTAButton>
</SuccessStep>
```

**Backend APIs**:
- `POST /api/wizard/complete` - Mark wizard as completed
- `GET /api/wizard/summary` - Get setup summary

## Technical Implementation

### State Management
```typescript
interface WizardState {
  currentStep: number;
  businessInfo: {
    name: string;
    type: string;
    website: string;
  };
  services: DetectedService[];
  notifications: NotificationConfig;
  statusPage: StatusPageConfig;
  isCompleted: boolean;
}

const useSetupWizard = () => {
  const [state, setState] = useState<WizardState>(initialState);
  
  const nextStep = () => setState(s => ({ ...s, currentStep: s.currentStep + 1 }));
  const prevStep = () => setState(s => ({ ...s, currentStep: s.currentStep - 1 }));
  const updateState = (updates: Partial<WizardState>) => setState(s => ({ ...s, ...updates }));
  
  return { state, nextStep, prevStep, updateState };
};
```

### Validation & Error Handling
```typescript
const wizardValidation = {
  businessInfo: z.object({
    name: z.string().min(1, "Business name is required"),
    website: z.string().url("Please enter a valid website URL")
  }),
  
  services: z.array(z.object({
    name: z.string().min(1),
    url: z.string().url(),
    enabled: z.boolean()
  })).min(1, "At least one service must be monitored")
};

const validateStep = async (step: number, data: any) => {
  switch (step) {
    case 2: return wizardValidation.businessInfo.parse(data);
    case 3: return wizardValidation.services.parse(data);
    default: return data;
  }
};
```

### Smart Defaults System
```typescript
const getSmartDefaults = (businessType: string, website: string) => {
  const defaults = {
    checkInterval: "5m",
    notifications: {
      email: true,
      slack: false,
      sms: false
    },
    statusPage: {
      theme: "clean",
      showUptime: true,
      showResponseTime: businessType === "API Service"
    }
  };
  
  // Customize based on business type
  if (businessType === "E-commerce") {
    defaults.checkInterval = "1m"; // More frequent for e-commerce
    defaults.notifications.sms = true; // SMS for critical sales impact
  }
  
  return defaults;
};
```

### Progress Tracking
```typescript
const calculateProgress = (step: number, completedActions: string[]) => {
  const stepProgress = (step - 1) / 6 * 100;
  const actionProgress = completedActions.length * 5; // Bonus for completed actions
  return Math.min(stepProgress + actionProgress, 100);
};
```

## Integration Points

### Existing OpenStatus APIs
- **Monitor Creation**: Extend `/api/monitors` for simplified creation
- **Notification Setup**: Use existing `/api/notifications` with smart defaults
- **Status Page**: Extend `/api/status-pages` for wizard-generated pages

### New APIs Required
```typescript
// Wizard-specific endpoints
POST /api/wizard/start        // Initialize wizard session
POST /api/wizard/auto-detect  // Service discovery
POST /api/wizard/validate     // Real-time validation
POST /api/wizard/complete     // Finalize setup

// Enhanced service detection
POST /api/services/detect     // Smart service discovery
POST /api/services/test       // Test endpoint connectivity
```

## Success Metrics

### User Experience Metrics
- **Time to Complete**: Target < 2 minutes average
- **Completion Rate**: Target > 80% completion rate
- **Drop-off Analysis**: Track where users abandon the flow
- **User Satisfaction**: Post-wizard survey scores

### Technical Metrics
- **Auto-detection Accuracy**: % of services correctly identified
- **First Monitor Success**: % of monitors working after setup
- **Integration Success**: % of notification integrations working

### Business Metrics
- **Activation Rate**: % of users who complete first monitor check
- **Retention**: 7-day and 30-day retention of wizard completers
- **Upgrade Rate**: % who upgrade after trial period

## Implementation Timeline

### Phase 1 (Week 1): Core Wizard Flow
- Basic 6-step wizard structure
- Business info collection
- Manual service addition
- Email notifications
- Basic status page

### Phase 2 (Week 2): Smart Features
- Auto-service detection
- Slack integration
- Real-time endpoint testing
- Progress indicators and animations

### Phase 3 (Week 3): Polish & Optimization
- Advanced error handling
- Smart defaults system
- Performance optimization
- Analytics tracking

### Phase 4 (Week 4): Testing & Iteration
- User testing with target founders
- A/B testing different flows
- Conversion optimization
- Documentation and help content

## Files to Create/Modify

### New Components
- `apps/dashboard/src/components/wizard/`
  - `SetupWizard.tsx` - Main wizard container
  - `WelcomeStep.tsx` - Step 1 component
  - `BusinessContextStep.tsx` - Step 2 component
  - `ServiceDiscoveryStep.tsx` - Step 3 component
  - `NotificationStep.tsx` - Step 4 component
  - `StatusPageStep.tsx` - Step 5 component
  - `SuccessStep.tsx` - Step 6 component
  - `WizardProgress.tsx` - Progress indicator
  - `ServiceDetector.tsx` - Auto-detection logic

### New API Routes
- `apps/dashboard/src/app/api/wizard/` - Wizard-specific endpoints
- `packages/api/src/router/wizard.ts` - tRPC wizard router

### Database Changes
- Add wizard completion tracking
- Store wizard preferences
- Track setup metrics

This architecture provides a comprehensive foundation for the 2-minute setup wizard that differentiates StatusHQ while leveraging the robust OpenStatus infrastructure.