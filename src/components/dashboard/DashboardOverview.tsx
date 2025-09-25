import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  FileText, 
  Database, 
  TrendingUp,
  Users,
  Target,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const statsCards = [
  {
    title: "Total Animals",
    value: "2,847",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: Users,
    description: "Animals registered this month"
  },
  {
    title: "AI Accuracy",
    value: "94.2%",
    change: "+2.1%",
    changeType: "positive" as const,
    icon: Target,
    description: "Average prediction accuracy"
  },
  {
    title: "Breeds Identified",
    value: "47",
    change: "+3",
    changeType: "positive" as const,
    icon: Database,
    description: "Unique breeds in database"
  },
  {
    title: "Daily Registrations",
    value: "23",
    change: "-5.2%",
    changeType: "negative" as const,
    icon: TrendingUp,
    description: "Animals registered today"
  }
];

const quickActions = [
  {
    title: "Identify Breed",
    description: "Upload or capture animal photo for AI identification",
    icon: Camera,
    href: "/breed-identification",
    color: "bg-primary text-primary-foreground"
  },
  {
    title: "Register Animal",
    description: "Add new animal to the database",
    icon: FileText,
    href: "/registration",
    color: "bg-secondary text-secondary-foreground"
  },
  {
    title: "Browse Breeds",
    description: "Explore cattle and buffalo breed database",
    icon: Database,
    href: "/breeds",
    color: "bg-accent text-accent-foreground"
  }
];

const recentActivity = [
  {
    type: "identification",
    message: "Gir cattle identified with 96.8% confidence",
    time: "2 minutes ago",
    status: "success"
  },
  {
    type: "registration", 
    message: "New Murrah buffalo registered by FLW-001",
    time: "15 minutes ago",
    status: "info"
  },
  {
    type: "identification",
    message: "Holstein Friesian identified with 89.3% confidence",
    time: "32 minutes ago",
    status: "success"
  },
  {
    type: "error",
    message: "Low confidence prediction for uploaded image",
    time: "1 hour ago",
    status: "warning"
  }
];

export const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary-hover rounded-lg p-6 text-primary-foreground">
        <h1 className="text-2xl font-bold mb-2">Welcome to BPA Dashboard</h1>
        <p className="text-primary-foreground/90 mb-4">
          AI-powered cattle and buffalo breed recognition system for Field Level Workers
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => (
          <Card key={stat.title} className="card-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs mt-1">
                <span className={`${stat.changeType === 'positive' ? 'text-success' : 'text-destructive'}`}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action) => (
                  <Link key={action.title} to={action.href}>
                    <Card className="hover:scale-105 transition-transform cursor-pointer border-2 hover:border-primary/50">
                      <CardContent className="p-4 text-center">
                        <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mx-auto mb-3`}>
                          <action.icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold mb-1">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                  <div className="flex-shrink-0 mt-0.5">
                    {activity.status === 'success' && <CheckCircle className="h-4 w-4 text-success" />}
                    {activity.status === 'warning' && <AlertCircle className="h-4 w-4 text-warning" />}
                    {activity.status === 'info' && <FileText className="h-4 w-4 text-secondary" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};