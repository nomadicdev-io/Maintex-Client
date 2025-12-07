import { createLazyFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../../../../components/sections/DashboardBanner'  
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowUpRight, 
  Wallet, 
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ExternalLink
} from 'lucide-react'

export const Route = createLazyFileRoute(
  '/app/_app/admin/_admin/settings/_settings/payments-billing',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const [selectedMonth, setSelectedMonth] = useState('September')
  const [selectedGateway, setSelectedGateway] = useState('Xendit')
  const [stripeEnabled, setStripeEnabled] = useState(true)
  const [paypalEnabled, setPaypalEnabled] = useState(false)
  const [pinkokuEnabled, setPinkokuEnabled] = useState(false)

  // Mock data - replace with actual API calls
  const totalRevenue = 32725
  const revenueChange = 12
  const withdrawableBalance = 12430.50
  const activeMembers = 1248

  const withdrawHistory = [
    { id: 'POUT-2025-09-10', amount: 5000.00, date: '2025-09-10', method: 'Bank Transfer', status: 'Pending' },
    { id: 'POUT-2025-08-10', amount: 4500.00, date: '2025-08-10', method: 'Bank Transfer', status: 'Pending' },
    { id: 'POUT-2025-07-10', amount: 5000.00, date: '2025-07-10', method: 'Bank Transfer', status: 'Pending' },
  ]

  const paymentHistory = [
    { id: 'PMT-1321', memberId: 'MV1203', method: 'Card', amount: 25.00, plan: 'Premium', date: '2025-09-20', status: 'Complete' },
    { id: 'PMT-1320', memberId: 'MV1202', method: 'Card', amount: 50.00, plan: 'Enterprise', date: '2025-09-19', status: 'Complete' },
    { id: 'PMT-1319', memberId: 'MV1201', method: 'PayPal', amount: 25.00, plan: 'Premium', date: '2025-09-18', status: 'Pending' },
  ]

  const paymentMilestones = [
    { 
      name: 'Kickoff', 
      percentage: 25, 
      amount: 25000, 
      description: 'To ignite the project with design and planning.',
      status: 'completed',
      date: '2025-01-15'
    },
    { 
      name: 'Midway Milestone', 
      percentage: 25, 
      amount: 25000, 
      description: 'Maintex API and Maintex Pro take shape.',
      status: 'completed',
      date: '2025-03-15'
    },
    { 
      name: 'Testing Triumph', 
      percentage: 25, 
      amount: 25000, 
      description: 'When testing ensures perfection.',
      status: 'pending',
      date: '2025-05-15'
    },
    { 
      name: 'Launch Legends', 
      percentage: 25, 
      amount: 25000, 
      description: 'Upon deployment and training.',
      status: 'upcoming',
      date: '2025-07-15'
    },
  ]

  const costBreakdown = [
    { component: 'Dream & Design', description: 'Wireframes, UI/UX magic for all apps', cost: 15000 },
    { component: 'Maintex Pro', description: 'Admin dashboard with analytics', cost: 30000 },
    { component: 'Maintex Core', description: 'Server monitoring and management', cost: 25000 },
    { component: 'Maintex API', description: 'Central API hub for seamless integration', cost: 20000 },
    { component: 'Maintex Go', description: 'Client mobile app (Android & iOS)', cost: 0 },
    { component: 'Maintex Team', description: 'Service team app with voice & QR', cost: 0 },
    { component: 'Quality Quest', description: 'Rigorous testing across all components', cost: 0 },
    { component: 'Builtrite Teamify', description: 'HR System, Employee Portal (Web & Mobile)', cost: 10000 },
  ]

  const totalCost = costBreakdown.reduce((sum, item) => sum + item.cost, 0)

  return (
    <div className='relative w-full flex flex-col'>
      <DashboardBanner 
        title={'Payments & Billing'} 
        description={'Track key insights about your payments, billing, and revenue growth.'} 
      />

      <div className="relative w-full flex flex-col gap-6 p-5">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Payment Schedule</TabsTrigger>
            <TabsTrigger value="history">Billing History</TabsTrigger>
            <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
            <TabsTrigger value="gateways">Gateway Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Total Revenue Card */}
              <Card className='border-border'>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-text/60">Total Revenue</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium">{selectedMonth}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-xs text-text/50">Total Revenue this month</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-3xl font-bold">${totalRevenue.toLocaleString()}</h3>
                      <Badge variant="teal" className="gap-1">
                        <ArrowUpRight className="h-3 w-3" />
                        +{revenueChange}% vs last month
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Withdrawable Balance Card */}
              <Card className='border-border'>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-text/60">Withdrawable Balance</CardTitle>
                </CardHeader>
                <CardContent className='border-border'>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-text/50 mb-1">Available Balance</p>
                      <h3 className="text-3xl font-bold">${withdrawableBalance.toLocaleString()}</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text/60">Payment Gateway:</span>
                        
                      </div>
                   
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Active Members Card */}
              <Card className='border-border'>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-text/60">Active Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-xs text-text/50">Total active members in {selectedMonth} 2025</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-3xl font-bold">{activeMembers.toLocaleString()}</h3>
                      <span className="text-sm text-text/50">Members</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Withdraw History */}
            <Card className='border-border'>
              <CardHeader>
                <CardTitle>Withdraw History</CardTitle>
                <CardDescription>Recent withdrawal transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payout ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {withdrawHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>${item.amount.toLocaleString()}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.method}</TableCell>
                        <TableCell>
                          <Badge variant="teal" className="gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            {item.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    See More History
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Member History */}
            <Card className='border-border'>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Payment Member History</CardTitle>
                    <CardDescription className="text-sm text-text/60">Recent payment transactions from members</CardDescription>
                  </div>
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="September">Sept 2025</SelectItem>
                      <SelectItem value="August">Aug 2025</SelectItem>
                      <SelectItem value="July">July 2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Member ID</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.memberId}</TableCell>
                        <TableCell>{item.method}</TableCell>
                        <TableCell>${item.amount.toFixed(2)}</TableCell>
                        <TableCell>{item.plan}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={item.status === 'Complete' ? 'teal' : 'amber'}
                            className="gap-1"
                          >
                            {item.status === 'Complete' ? (
                              <CheckCircle2 className="h-3 w-3" />
                            ) : (
                              <Clock className="h-3 w-3" />
                            )}
                            {item.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6 mt-6">
            <Card className='border-border'>
              <CardHeader>
                <CardTitle className="text-2xl">Payment Flow</CardTitle>
                <CardDescription className="text-sm text-text/60">Payment schedule based on 25-25-25-25 payment terms (AED 100,000 total investment)</CardDescription>
                <CardDescription>
                  Payment schedule based on 25-25-25-25 payment terms (AED 100,000 total investment)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {paymentMilestones.map((milestone, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-semibold">{milestone.name}</h4>
                            <Badge 
                              variant={
                                milestone.status === 'completed' ? 'teal' : 
                                milestone.status === 'pending' ? 'amber' : 'gray'
                              }
                            >
                              {milestone.status === 'completed' ? 'Completed' : 
                               milestone.status === 'pending' ? 'Pending' : 'Upcoming'}
                            </Badge>
                          </div>
                          <p className="text-sm text-text/60 mb-3">{milestone.description}</p>
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="text-xs text-text/50">Amount</p>
                              <p className="text-lg font-semibold">AED {milestone.amount.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-text/50">Percentage</p>
                              <p className="text-lg font-semibold">{milestone.percentage}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-text/50">Due Date</p>
                              <p className="text-lg font-semibold">{milestone.date}</p>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          {milestone.status === 'completed' && (
                            <CheckCircle2 className="h-6 w-6 text-teal-500" />
                          )}
                          {milestone.status === 'pending' && (
                            <Clock className="h-6 w-6 text-amber-500" />
                          )}
                          {milestone.status === 'upcoming' && (
                            <AlertCircle className="h-6 w-6 text-gray-500" />
                          )}
                        </div>
                      </div>
                      {index < paymentMilestones.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Payment Method</h4>
                    <p className="text-sm text-text/60">Bank transfer, smooth and secure.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">What's Included</h4>
                    <p className="text-sm text-text/60">
                      All development, testing, and 1 Year Free support, maintenance, monitoring, library updates.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">What's Excluded</h4>
                    <p className="text-sm text-text/60">
                      Ongoing hosting, third-party fees, SMTP, SMS API, Push Services or additional features beyond scope.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing History Tab */}
          <TabsContent value="history" className="space-y-6 mt-6">
            <Card className='border-border'>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Payment History</CardTitle>
                    <CardDescription className="text-sm text-text/60">Complete history of all payment transactions</CardDescription>
                    <CardDescription>Complete history of all payment transactions</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Member ID</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.memberId}</TableCell>
                        <TableCell>{item.method}</TableCell>
                        <TableCell>${item.amount.toFixed(2)}</TableCell>
                        <TableCell>{item.plan}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={item.status === 'Complete' ? 'teal' : 'amber'}
                            className="gap-1"
                          >
                            {item.status === 'Complete' ? (
                              <CheckCircle2 className="h-3 w-3" />
                            ) : (
                              <Clock className="h-3 w-3" />
                            )}
                            {item.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cost Breakdown Tab */}
          <TabsContent value="breakdown" className="space-y-6 mt-6">
            <Card className='border-border'>
              <CardHeader>
                <CardTitle className="text-2xl">Investment Cost Breakdown</CardTitle>
                <CardDescription className="text-sm text-text/60">Detailed breakdown of costs for each component (Total Investment: AED 100,000)</CardDescription>
                <CardDescription>
                  Detailed breakdown of costs for each component (Total Investment: AED 100,000)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Component</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Cost (AED)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {costBreakdown.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.component}</TableCell>
                        <TableCell className="text-text/60">{item.description}</TableCell>
                        <TableCell className="text-right font-semibold">
                          {item.cost === 0 ? (
                            <Badge variant="outline">Free of cost</Badge>
                          ) : (
                            item.cost.toLocaleString()
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-bg-300 font-semibold">
                      <TableCell colSpan={2} className="font-bold">Total Investment</TableCell>
                      <TableCell className="text-right font-bold text-lg">
                        AED {totalCost.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gateway Settings Tab */}
          <TabsContent value="gateways" className="space-y-6 mt-6">
            <Card className='border-border'>
              <CardHeader>
                <CardTitle>Payment Gateway Integration</CardTitle>
                <CardDescription>
                  Manage and configure your payment gateway integrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Stripe */}
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">Stripe</h4>
                        <Switch checked={stripeEnabled} onCheckedChange={setStripeEnabled} />
                      </div>
                      {stripeEnabled ? (
                        <p className="text-sm text-text/60">acct_1XY...91</p>
                      ) : (
                        <p className="text-sm text-text/40">Not configured</p>
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>

                  {/* PayPal */}
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">PayPal</h4>
                        <Switch checked={paypalEnabled} onCheckedChange={setPaypalEnabled} />
                      </div>
                      {paypalEnabled ? (
                        <p className="text-sm text-text/60">Connected</p>
                      ) : (
                        <p className="text-sm text-text/40">Not configured</p>
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>

                  {/* Pinkoku */}
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">Pinkoku</h4>
                        <Switch checked={pinkokuEnabled} onCheckedChange={setPinkokuEnabled} />
                      </div>
                      {pinkokuEnabled ? (
                        <p className="text-sm text-text/60">Connected</p>
                      ) : (
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-text/40">Not configured</p>
                          <MessageCircle className="h-4 w-4 text-text/40" />
                        </div>
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="bg-bg-300/50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <ExternalLink className="h-5 w-5 text-text/60 mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Integration Guide</h4>
                      <p className="text-sm text-text/60 mb-3">
                        Need help integrating a payment gateway? Check out our comprehensive integration guide.
                      </p>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Documentation
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
