import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const GameAnalytics = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Mock data for demonstration
  const metrics = {
    dau: { value: 12547, change: 8.2 },
    wau: { value: 45821, change: -2.1 },
    mau: { value: 156743, change: 12.5 },
    revenue: { value: 89420, change: 15.3 },
    arpu: { value: 5.68, change: 3.2 },
    arppu: { value: 24.50, change: -1.8 },
    retention1: 78.5,
    retention3: 45.2,
    retention7: 28.7,
    retention30: 12.3
  };

  const MetricCard = ({ 
    title, 
    value, 
    change, 
    icon, 
    format: valueFormat = 'number',
    className = ''
  }: {
    title: string;
    value: number;
    change?: number;
    icon: string;
    format?: 'number' | 'currency' | 'percentage';
    className?: string;
  }) => {
    const formatValue = (val: number) => {
      switch (valueFormat) {
        case 'currency':
          return `$${val.toLocaleString()}`;
        case 'percentage':
          return `${val}%`;
        default:
          return val.toLocaleString();
      }
    };

    return (
      <Card className={`bg-gradient-card backdrop-blur-sm border-gray-dark/30 hover:border-amber-accent/50 transition-all duration-300 animate-scale-in ${className}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-gray-light">{title}</CardTitle>
          <div className="p-2 rounded-lg bg-gradient-gaming">
            <Icon name={icon} size={16} className="text-amber-accent" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white mb-2">
            {formatValue(value)}
          </div>
          {change !== undefined && (
            <div className="flex items-center text-xs">
              <Icon 
                name={change > 0 ? "TrendingUp" : "TrendingDown"} 
                size={12} 
                className={change > 0 ? "text-green-500" : "text-red-500"} 
              />
              <span className={change > 0 ? "text-green-500 ml-1" : "text-red-500 ml-1"}>
                {Math.abs(change)}%
              </span>
              <span className="text-gray-light ml-1">за неделю</span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const RetentionChart = ({ data }: { data: { [key: string]: number } }) => (
    <Card className="bg-gradient-card backdrop-blur-sm border-gray-dark/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Icon name="Users" size={20} className="mr-2 text-amber-accent" />
          Retention Rate
        </CardTitle>
        <CardDescription className="text-gray-light">
          Процент удержания пользователей
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-light">День {key.replace('retention', '')}</span>
              <span className="text-white font-semibold">{value}%</span>
            </div>
            <Progress 
              value={value} 
              className="h-2 bg-gray-dark"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-dark-navy text-white font-['Roboto']">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-dark-navy/95 backdrop-blur-sm border-b border-gray-dark/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-gaming animate-pulse-glow">
                <Icon name="BarChart3" size={24} className="text-amber-accent" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Gaming Analytics</h1>
                <p className="text-gray-light text-sm">Панель аналитики игровых метрик</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-dark text-gray-light hover:border-amber-accent hover:text-amber-accent transition-colors"
              >
                <Icon name="Download" size={16} className="mr-2" />
                Экспорт
              </Button>
              <Badge variant="outline" className="border-green-500 text-green-500 animate-pulse">
                Live
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-gray-dark/50 border border-gray-dark/30 p-1 rounded-xl">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-gradient-gaming data-[state=active]:text-white px-6 py-2 rounded-lg transition-all duration-300"
            >
              <Icon name="Home" size={16} className="mr-2" />
              Общие метрики
            </TabsTrigger>
            <TabsTrigger 
              value="period"
              className="data-[state=active]:bg-gradient-gaming data-[state=active]:text-white px-6 py-2 rounded-lg transition-all duration-300"
            >
              <Icon name="Calendar" size={16} className="mr-2" />
              Период метрик
            </TabsTrigger>
            <TabsTrigger 
              value="comparison"
              className="data-[state=active]:bg-gradient-gaming data-[state=active]:text-white px-6 py-2 rounded-lg transition-all duration-300"
            >
              <Icon name="BarChart" size={16} className="mr-2" />
              Сравнение
            </TabsTrigger>
            <TabsTrigger 
              value="monetization"
              className="data-[state=active]:bg-gradient-gaming data-[state=active]:text-white px-6 py-2 rounded-lg transition-all duration-300"
            >
              <Icon name="DollarSign" size={16} className="mr-2" />
              Донат метрики
            </TabsTrigger>
            <TabsTrigger 
              value="gaming"
              className="data-[state=active]:bg-gradient-gaming data-[state=active]:text-white px-6 py-2 rounded-lg transition-all duration-300"
            >
              <Icon name="Gamepad2" size={16} className="mr-2" />
              Игровые метрики
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8 animate-fade-in">
            {/* Date Picker */}
            <div className="flex items-center space-x-4">
              <Icon name="Calendar" size={20} className="text-amber-accent" />
              <span className="text-gray-light">Данные за:</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-gray-dark/50 border-gray-dark hover:border-amber-accent hover:bg-gray-dark text-white"
                  >
                    <Icon name="Calendar" size={16} className="mr-2" />
                    {date ? format(date, 'dd MMMM yyyy', { locale: ru }) : 'Выберите дату'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-dark border-gray-dark/30">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="text-white"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 animate-slide-up">
              <MetricCard
                title="DAU (Daily Active Users)"
                value={metrics.dau.value}
                change={metrics.dau.change}
                icon="Users"
              />
              <MetricCard
                title="WAU (Weekly Active Users)"
                value={metrics.wau.value}
                change={metrics.wau.change}
                icon="UserCheck"
              />
              <MetricCard
                title="MAU (Monthly Active Users)"
                value={metrics.mau.value}
                change={metrics.mau.change}
                icon="UsersRound"
              />
              <MetricCard
                title="Доход за день"
                value={metrics.revenue.value}
                change={metrics.revenue.change}
                icon="DollarSign"
                format="currency"
              />
            </div>

            {/* Monetization Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard
                title="ARPU (Avg Revenue Per User)"
                value={metrics.arpu.value}
                change={metrics.arpu.change}
                icon="TrendingUp"
                format="currency"
              />
              <MetricCard
                title="ARPPU (Avg Revenue Per Paying User)"
                value={metrics.arppu.value}
                change={metrics.arppu.change}
                icon="CreditCard"
                format="currency"
              />
              <RetentionChart 
                data={{
                  retention1: metrics.retention1,
                  retention3: metrics.retention3,
                  retention7: metrics.retention7,
                  retention30: metrics.retention30
                }} 
              />
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                variant="outline"
                className="border-amber-accent text-amber-accent hover:bg-amber-accent hover:text-dark-navy transition-colors"
              >
                <Icon name="Zap" size={16} className="mr-2" />
                Быстрая аналитика
              </Button>
              <Button 
                variant="outline"
                className="border-pink-accent text-pink-accent hover:bg-pink-accent hover:text-white transition-colors"
              >
                <Icon name="Bell" size={16} className="mr-2" />
                Настроить уведомления
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="period" className="animate-fade-in">
            <Card className="bg-gradient-card backdrop-blur-sm border-gray-dark/30">
              <CardHeader>
                <CardTitle className="text-white">Метрики за период</CardTitle>
                <CardDescription className="text-gray-light">
                  Анализ данных за выбранный период времени
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-light">
                  <Icon name="Clock" size={48} className="mx-auto mb-4 text-amber-accent" />
                  <p>Выберите период для анализа метрик</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="animate-fade-in">
            <Card className="bg-gradient-card backdrop-blur-sm border-gray-dark/30">
              <CardHeader>
                <CardTitle className="text-white">Сравнение метрик</CardTitle>
                <CardDescription className="text-gray-light">
                  Сравнительный анализ показателей
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-light">
                  <Icon name="BarChart" size={48} className="mx-auto mb-4 text-pink-accent" />
                  <p>Выберите периоды для сравнения</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monetization" className="animate-fade-in">
            <Card className="bg-gradient-card backdrop-blur-sm border-gray-dark/30">
              <CardHeader>
                <CardTitle className="text-white">Монетизация</CardTitle>
                <CardDescription className="text-gray-light">
                  Детальная аналитика доходов и платежей
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-light">
                  <Icon name="DollarSign" size={48} className="mx-auto mb-4 text-amber-accent" />
                  <p>Анализ доходности и монетизации</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gaming" className="animate-fade-in">
            <Card className="bg-gradient-card backdrop-blur-sm border-gray-dark/30">
              <CardHeader>
                <CardTitle className="text-white">Игровые метрики</CardTitle>
                <CardDescription className="text-gray-light">
                  Специфические игровые показатели и достижения
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-light">
                  <Icon name="Gamepad2" size={48} className="mx-auto mb-4 text-pink-accent" />
                  <p>Статистика игрового процесса и достижений</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default GameAnalytics;