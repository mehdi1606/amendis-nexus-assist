import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { 
  MessageCircle, 
  TrendingUp, 
  Clock, 
  Star, 
  Users, 
  AlertCircle, 
  ArrowUp, 
  ArrowDown,
  Download,
  Filter,
  RefreshCw,
  Calendar,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";
import { AdminLayout } from "@/components/AdminLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminPage = () => {
  // Données factices pour les statistiques
  const conversationData = [
    { month: 'Jan', conversations: 245, satisfaction: 4.2, resolution: 82, responseTime: 1.8 },
    { month: 'Fév', conversations: 312, satisfaction: 4.5, resolution: 85, responseTime: 1.6 },
    { month: 'Mar', conversations: 428, satisfaction: 4.3, resolution: 88, responseTime: 1.4 },
    { month: 'Avr', conversations: 386, satisfaction: 4.6, resolution: 87, responseTime: 1.3 },
    { month: 'Mai', conversations: 451, satisfaction: 4.4, resolution: 89, responseTime: 1.2 },
    { month: 'Jun', conversations: 523, satisfaction: 4.7, resolution: 91, responseTime: 1.1 },
  ];

  const dailyActivityData = [
    { day: 'Lun', conversations: 89, issues: 5, resolved: 84 },
    { day: 'Mar', conversations: 112, issues: 8, resolved: 104 },
    { day: 'Mer', conversations: 95, issues: 3, resolved: 92 },
    { day: 'Jeu', conversations: 134, issues: 12, resolved: 122 },
    { day: 'Ven', conversations: 78, issues: 2, resolved: 76 },
    { day: 'Sam', conversations: 45, issues: 1, resolved: 44 },
    { day: 'Dim', conversations: 32, issues: 0, resolved: 32 },
  ];

  const recentConversations = [
    { id: "C001", user: "Client A", topic: "Facture eau", status: "resolved", duration: "2m 34s", satisfaction: 5, timestamp: "10:30" },
    { id: "C002", user: "Client B", topic: "Panne électricité", status: "escalated", duration: "5m 12s", satisfaction: 3, timestamp: "10:25" },
    { id: "C003", user: "Client C", topic: "Nouveau branchement", status: "resolved", duration: "3m 45s", satisfaction: 4, timestamp: "10:20" },
    { id: "C004", user: "Client D", topic: "Réclamation", status: "pending", duration: "1m 58s", satisfaction: null, timestamp: "10:15" },
    { id: "C005", user: "Client E", topic: "Info tarifs", status: "resolved", duration: "2m 10s", satisfaction: 5, timestamp: "10:10" },
  ];

  const alerts = [
    { type: "error", message: "Temps de réponse élevé détecté", timestamp: "Il y a 5 min", severity: "high" },
    { type: "warning", message: "Pic d'activité inhabituel", timestamp: "Il y a 12 min", severity: "medium" },
    { type: "info", message: "Mise à jour système programmée", timestamp: "Il y a 1h", severity: "low" },
  ];

  const topicsData = [
    { name: 'Factures', value: 35, color: 'hsl(var(--primary))' },
    { name: 'Eau', value: 28, color: 'hsl(var(--cyan))' },
    { name: 'Électricité', value: 20, color: 'hsl(var(--orange))' },
    { name: 'Réclamations', value: 12, color: 'hsl(var(--purple))' },
    { name: 'Autres', value: 5, color: 'hsl(var(--green))' },
  ];

  const responseTimeData = [
    { hour: '00h', avgTime: 1.2 },
    { hour: '06h', avgTime: 0.8 },
    { hour: '12h', avgTime: 2.1 },
    { hour: '18h', avgTime: 1.7 },
    { hour: '24h', avgTime: 1.0 },
  ];

  const chartConfig = {
    conversations: {
      label: "Conversations",
      color: "hsl(var(--primary))",
    },
    satisfaction: {
      label: "Satisfaction",
      color: "hsl(var(--cyan))",
    },
    avgTime: {
      label: "Temps moyen (min)",
      color: "hsl(var(--orange))",
    },
    resolution: {
      label: "Résolution (%)",
      color: "hsl(var(--green))",
    },
    issues: {
      label: "Problèmes",
      color: "hsl(var(--destructive))",
    },
    resolved: {
      label: "Résolus",
      color: "hsl(var(--green))",
    },
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green" />;
      case 'pending': return <Clock className="h-4 w-4 text-orange" />;
      case 'escalated': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default: return <XCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      resolved: "bg-green/10 text-green border-green/20",
      pending: "bg-orange/10 text-orange border-orange/20", 
      escalated: "bg-destructive/10 text-destructive border-destructive/20"
    };
    return variants[status] || "bg-muted text-muted-foreground";
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <XCircle className="h-4 w-4 text-destructive" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange" />;
      case 'info': return <CheckCircle className="h-4 w-4 text-cyan" />;
      default: return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <AdminLayout 
      title="Tableau de bord" 
      description="Vue d'ensemble des performances du chatbot AMENDIS"
    >
      <div className="space-y-6">
        {/* Header avec actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Select defaultValue="7d">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">24h</SelectItem>
                <SelectItem value="7d">7 jours</SelectItem>
                <SelectItem value="30d">30 jours</SelectItem>
                <SelectItem value="90d">3 mois</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Alertes importantes */}
        {alerts.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">Alertes récentes</h3>
            <div className="space-y-2">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border bg-card">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                  </div>
                  <Badge 
                    variant={alert.severity === 'high' ? 'destructive' : alert.severity === 'medium' ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {alert.severity === 'high' ? 'Critique' : alert.severity === 'medium' ? 'Moyen' : 'Info'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Métriques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover-scale-sm transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Conversations totales</CardTitle>
              <MessageCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">2,345</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <ArrowUp className="h-3 w-3 text-green mr-1" />
                <span className="text-green font-medium">+12%</span> ce mois
              </p>
            </CardContent>
          </Card>

          <Card className="hover-scale-sm transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Satisfaction moyenne</CardTitle>
              <Star className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">4.6/5</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <ArrowUp className="h-3 w-3 text-green mr-1" />
                <span className="text-green font-medium">+0.3</span> ce mois
              </p>
            </CardContent>
          </Card>

          <Card className="hover-scale-sm transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Temps de réponse</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">1.1s</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <ArrowDown className="h-3 w-3 text-green mr-1" />
                <span className="text-green font-medium">-0.3s</span> ce mois
              </p>
            </CardContent>
          </Card>

          <Card className="hover-scale-sm transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Taux de résolution</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">91%</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <ArrowUp className="h-3 w-3 text-green mr-1" />
                <span className="text-green font-medium">+4%</span> ce mois
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Graphiques et données détaillées */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Activité quotidienne */}
          <div className="xl:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Activité de la semaine</CardTitle>
                    <CardDescription>Conversations et résolutions par jour</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Détails
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={dailyActivityData}>
                      <defs>
                        <linearGradient id="conversations" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="resolved" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--green))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--green))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="day" className="text-muted-foreground" />
                      <YAxis className="text-muted-foreground" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area 
                        type="monotone" 
                        dataKey="conversations" 
                        stroke="hsl(var(--primary))" 
                        fillOpacity={1}
                        fill="url(#conversations)"
                        strokeWidth={2}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="resolved" 
                        stroke="hsl(var(--green))" 
                        fillOpacity={1}
                        fill="url(#resolved)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Métriques de qualité */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Indicateurs de qualité</CardTitle>
                <CardDescription>Performance en temps réel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Précision des réponses</span>
                    <span className="text-sm font-bold text-primary">94%</span>
                  </div>
                  <Progress value={94} className="h-2 bg-muted" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Compréhension</span>
                    <span className="text-sm font-bold text-primary">91%</span>
                  </div>
                  <Progress value={91} className="h-2 bg-muted" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Pertinence</span>
                    <span className="text-sm font-bold text-primary">88%</span>
                  </div>
                  <Progress value={88} className="h-2 bg-muted" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Résolution directe</span>
                    <span className="text-sm font-bold text-primary">82%</span>
                  </div>
                  <Progress value={82} className="h-2 bg-muted" />
                </div>

                <div className="pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">A+</div>
                    <p className="text-xs text-muted-foreground">Note globale</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Conversations récentes */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Conversations récentes</CardTitle>
                <Button variant="outline" size="sm">
                  Voir tout
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-muted">
                      <TableHead className="text-xs">ID</TableHead>
                      <TableHead className="text-xs">Sujet</TableHead>
                      <TableHead className="text-xs">Statut</TableHead>
                      <TableHead className="text-xs">Durée</TableHead>
                      <TableHead className="text-xs">Note</TableHead>
                      <TableHead className="text-xs">Heure</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentConversations.map((conv) => (
                      <TableRow key={conv.id} className="border-muted hover:bg-muted/30">
                        <TableCell className="font-mono text-xs">{conv.id}</TableCell>
                        <TableCell className="text-sm">{conv.topic}</TableCell>
                        <TableCell>
                          <Badge className={`text-xs ${getStatusBadge(conv.status)}`}>
                            {conv.status === 'resolved' ? 'Résolu' : 
                             conv.status === 'pending' ? 'En cours' : 'Escaladé'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{conv.duration}</TableCell>
                        <TableCell>
                          {conv.satisfaction ? (
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow mr-1" />
                              <span className="text-sm">{conv.satisfaction}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{conv.timestamp}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Distribution des sujets */}
          <Card>
            <CardHeader>
              <CardTitle>Répartition des sujets</CardTitle>
              <CardDescription>Dernières 24h</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="min-h-[280px] w-full">
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={topicsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {topicsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {topicsData.map((topic, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: topic.color }}
                    />
                    <span className="text-xs truncate">{topic.name}: {topic.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Onglets de données détaillées */}
        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="trends">Tendances</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="quality">Qualité</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Évolution mensuelle</CardTitle>
                  <CardDescription>Conversations et taux de satisfaction</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="min-h-[350px] w-full">
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={conversationData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" className="text-muted-foreground" />
                        <YAxis className="text-muted-foreground" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar 
                          dataKey="conversations" 
                          fill="hsl(var(--primary))" 
                          radius={4}
                          name="Conversations"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Taux de résolution</CardTitle>
                  <CardDescription>Performance mensuelle du chatbot</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="min-h-[350px] w-full">
                    <ResponsiveContainer width="100%" height={350}>
                      <LineChart data={conversationData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" className="text-muted-foreground" />
                        <YAxis className="text-muted-foreground" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line 
                          type="monotone" 
                          dataKey="resolution" 
                          stroke="hsl(var(--green))" 
                          strokeWidth={3}
                          dot={{ fill: "hsl(var(--green))", strokeWidth: 2, r: 5 }}
                          name="Résolution %"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Temps de réponse détaillé</CardTitle>
                  <CardDescription>Évolution du temps de réponse par mois</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="min-h-[350px] w-full">
                    <ResponsiveContainer width="100%" height={350}>
                      <LineChart data={conversationData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" className="text-muted-foreground" />
                        <YAxis className="text-muted-foreground" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line 
                          type="monotone" 
                          dataKey="responseTime" 
                          stroke="hsl(var(--orange))" 
                          strokeWidth={3}
                          dot={{ fill: "hsl(var(--orange))", strokeWidth: 2, r: 5 }}
                          name="Temps (secondes)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistiques avancées</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-2xl font-bold text-primary">156</div>
                    <p className="text-sm text-muted-foreground">Sessions actives</p>
                  </div>
                  <div className="text-center p-4 bg-green/5 rounded-lg">
                    <div className="text-2xl font-bold text-green">98.7%</div>
                    <p className="text-sm text-muted-foreground">Disponibilité</p>
                  </div>
                  <div className="text-center p-4 bg-cyan/5 rounded-lg">
                    <div className="text-2xl font-bold text-cyan">2.1s</div>
                    <p className="text-sm text-muted-foreground">Temps moyen</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>


          <TabsContent value="quality" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Métriques de qualité détaillées</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Précision des réponses</span>
                      <span className="text-sm font-bold text-primary">94%</span>
                    </div>
                    <Progress value={94} className="h-3" />
                    <p className="text-xs text-muted-foreground mt-1">Basé sur 2,345 conversations</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Compréhension contextuelle</span>
                      <span className="text-sm font-bold text-primary">91%</span>
                    </div>
                    <Progress value={91} className="h-3" />
                    <p className="text-xs text-muted-foreground mt-1">Questions complexes comprises</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Pertinence des réponses</span>
                      <span className="text-sm font-bold text-primary">88%</span>
                    </div>
                    <Progress value={88} className="h-3" />
                    <p className="text-xs text-muted-foreground mt-1">Évaluations utilisateurs</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Résolution première interaction</span>
                      <span className="text-sm font-bold text-primary">82%</span>
                    </div>
                    <Progress value={82} className="h-3" />
                    <p className="text-xs text-muted-foreground mt-1">Sans escalade nécessaire</p>
                  </div>

                  <div className="pt-4 border-t bg-gradient-subtle rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">A+</div>
                      <p className="text-sm font-medium text-muted-foreground">Score global de qualité</p>
                      <p className="text-xs text-muted-foreground">Basé sur l'algorithme d'évaluation AMENDIS</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Feedback utilisateurs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 rounded-lg bg-green/10 border border-green/20">
                      <div className="text-2xl font-bold text-green">1,847</div>
                      <p className="text-xs text-muted-foreground">Positifs (78%)</p>
                    </div>
                    <div className="p-3 rounded-lg bg-orange/10 border border-orange/20">
                      <div className="text-2xl font-bold text-orange">345</div>
                      <p className="text-xs text-muted-foreground">Neutres (15%)</p>
                    </div>
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <div className="text-2xl font-bold text-destructive">153</div>
                      <p className="text-xs text-muted-foreground">Négatifs (7%)</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3 text-sm">Commentaires récents</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 rounded-lg bg-green/5 border border-green/10">
                        <Star className="h-4 w-4 text-green mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">"Excellent service, très réactif"</p>
                          <p className="text-xs text-muted-foreground">Il y a 2 min • Note: 5/5</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 rounded-lg bg-orange/5 border border-orange/10">
                        <AlertCircle className="h-4 w-4 text-orange mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">"Parfois ne comprend pas les questions techniques"</p>
                          <p className="text-xs text-muted-foreground">Il y a 15 min • Note: 3/5</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 rounded-lg bg-green/5 border border-green/10">
                        <CheckCircle className="h-4 w-4 text-green mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">"Problème résolu rapidement, merci!"</p>
                          <p className="text-xs text-muted-foreground">Il y a 32 min • Note: 5/5</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full mt-4">
                    Voir tous les commentaires
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance système en temps réel</CardTitle>
                  <CardDescription>Métriques de performance du serveur</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={responseTimeData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="hour" className="text-muted-foreground" />
                        <YAxis className="text-muted-foreground" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line 
                          type="monotone" 
                          dataKey="avgTime" 
                          stroke="hsl(var(--orange))" 
                          strokeWidth={3}
                          dot={{ fill: "hsl(var(--orange))", strokeWidth: 2, r: 5 }}
                          name="Temps de réponse (s)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Métriques système</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green/5 rounded-lg border border-green/10">
                      <div className="text-2xl font-bold text-green">99.8%</div>
                      <p className="text-sm text-muted-foreground">Disponibilité</p>
                    </div>
                    <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/10">
                      <div className="text-2xl font-bold text-primary">34%</div>
                      <p className="text-sm text-muted-foreground">CPU moyen</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Mémoire utilisée</span>
                        <span className="text-sm font-medium">2.1 / 8 GB</span>
                      </div>
                      <Progress value={26} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Bande passante</span>
                        <span className="text-sm font-medium">45 / 100 Mbps</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Stockage</span>
                        <span className="text-sm font-medium">12 / 50 GB</span>
                      </div>
                      <Progress value={24} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <Card className="text-center p-4">
                <div className="text-2xl font-bold text-cyan mb-2">156</div>
                <p className="text-sm text-muted-foreground">Sessions actives</p>
              </Card>
              <Card className="text-center p-4">
                <div className="text-2xl font-bold text-primary mb-2">1.1s</div>
                <p className="text-sm text-muted-foreground">Temps moyen</p>
              </Card>
              <Card className="text-center p-4">
                <div className="text-2xl font-bold text-green mb-2">523</div>
                <p className="text-sm text-muted-foreground">Réponses/h</p>
              </Card>
              <Card className="text-center p-4">
                <div className="text-2xl font-bold text-orange mb-2">0.02%</div>
                <p className="text-sm text-muted-foreground">Taux d'erreur</p>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gestion des utilisateurs</CardTitle>
                    <CardDescription>Utilisateurs du système d'administration</CardDescription>
                  </div>
                  <Button>
                    Nouvel utilisateur
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Rôle</TableHead>
                        <TableHead>Dernière connexion</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Admin Principal</TableCell>
                        <TableCell>admin@amendis.ma</TableCell>
                        <TableCell><Badge>Super Admin</Badge></TableCell>
                        <TableCell>Il y a 5 min</TableCell>
                        <TableCell><Badge className="bg-green/10 text-green">Actif</Badge></TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Modifier</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Gestionnaire Chat</TableCell>
                        <TableCell>chatbot@amendis.ma</TableCell>
                        <TableCell><Badge variant="secondary">Gestionnaire</Badge></TableCell>
                        <TableCell>Il y a 2h</TableCell>
                        <TableCell><Badge className="bg-green/10 text-green">Actif</Badge></TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Modifier</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Analyste Support</TableCell>
                        <TableCell>support@amendis.ma</TableCell>
                        <TableCell><Badge variant="outline">Analyste</Badge></TableCell>
                        <TableCell>Hier</TableCell>
                        <TableCell><Badge className="bg-orange/10 text-orange">Inactif</Badge></TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Modifier</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;