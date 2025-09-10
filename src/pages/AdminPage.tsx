import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { MessageCircle, TrendingUp, Clock, Star, Users, AlertCircle } from "lucide-react";

const AdminPage = () => {
  // Données factices pour les statistiques
  const conversationData = [
    { month: 'Jan', conversations: 245, satisfaction: 4.2 },
    { month: 'Fév', conversations: 312, satisfaction: 4.5 },
    { month: 'Mar', conversations: 428, satisfaction: 4.3 },
    { month: 'Avr', conversations: 386, satisfaction: 4.6 },
    { month: 'Mai', conversations: 451, satisfaction: 4.4 },
    { month: 'Jun', conversations: 523, satisfaction: 4.7 },
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
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary py-8 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Administration - Chatbot AMENDIS</h1>
          <p className="text-white/90">Tableau de bord et analyses de performance</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Métriques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversations totales</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">2,345</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green">+12%</span> ce mois
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction moyenne</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">4.6/5</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green">+0.3</span> ce mois
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temps de réponse</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">1.4s</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green">-0.2s</span> ce mois
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de résolution</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">87%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green">+5%</span> ce mois
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Onglets de données détaillées */}
        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trends">Tendances</TabsTrigger>
            <TabsTrigger value="topics">Sujets populaires</TabsTrigger>
            <TabsTrigger value="quality">Qualité</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Évolution des conversations</CardTitle>
                <CardDescription>
                  Nombre de conversations et note de satisfaction par mois
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={conversationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar 
                        dataKey="conversations" 
                        fill="var(--color-conversations)" 
                        radius={4}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="topics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribution des sujets de conversation</CardTitle>
                <CardDescription>
                  Répartition des questions par catégorie
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={topicsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={150}
                        paddingAngle={5}
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
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {topicsData.map((topic, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: topic.color }}
                      />
                      <span className="text-sm">{topic.name}: {topic.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quality" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Indicateurs de qualité</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Précision des réponses</span>
                      <span className="text-sm text-muted-foreground">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Compréhension des questions</span>
                      <span className="text-sm text-muted-foreground">88%</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Pertinence des réponses</span>
                      <span className="text-sm text-muted-foreground">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Résolution en un échange</span>
                      <span className="text-sm text-muted-foreground">76%</span>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Retours utilisateurs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-green text-white">Positif</Badge>
                    <span className="text-sm">1,847 avis (78%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-orange text-white">Neutre</Badge>
                    <span className="text-sm">345 avis (15%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="destructive">Négatif</Badge>
                    <span className="text-sm">153 avis (7%)</span>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-medium mb-2">Commentaires récents</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start space-x-2">
                        <Star className="h-4 w-4 text-yellow mt-0.5" />
                        <span>"Réponses très rapides et précises"</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-orange mt-0.5" />
                        <span>"Parfois ne comprend pas bien les questions complexes"</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Temps de réponse par heure</CardTitle>
                <CardDescription>
                  Temps de réponse moyen du chatbot selon l'heure de la journée
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={responseTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="avgTime" 
                        stroke="var(--color-avgTime)" 
                        strokeWidth={3}
                        dot={{ fill: "var(--color-avgTime)", strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Disponibilité</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green mb-2">99.8%</div>
                  <p className="text-sm text-muted-foreground">Uptime ce mois</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Charge système</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">34%</div>
                  <p className="text-sm text-muted-foreground">Utilisation CPU moyenne</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Utilisateurs actifs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cyan mb-2">156</div>
                  <p className="text-sm text-muted-foreground">Conversations en cours</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;