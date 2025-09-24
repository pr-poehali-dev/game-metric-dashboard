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

          <TabsContent value="period" className="animate-fade-in space-y-6">
            {/* Period Selection */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="flex items-center space-x-4">
                <Icon name="CalendarRange" size={20} className="text-amber-accent" />
                <span className="text-gray-light">Период с:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-gray-dark/50 border-gray-dark hover:border-amber-accent hover:bg-gray-dark text-white"
                    >
                      <Icon name="Calendar" size={16} className="mr-2" />
                      01 сентября 2024
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-dark border-gray-dark/30">
                    <Calendar mode="single" className="text-white" />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-light">по:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-gray-dark/50 border-gray-dark hover:border-pink-accent hover:bg-gray-dark text-white"
                    >
                      <Icon name="Calendar" size={16} className="mr-2" />
                      24 сентября 2024
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-dark border-gray-dark/30">
                    <Calendar mode="single" className="text-white" />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Period Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <MetricCard
                title="Средний DAU за период"
                value={11340}
                change={5.8}
                icon="Users"
              />
              <MetricCard
                title="Общий доход за период"
                value={2150000}
                change={18.2}
                icon="DollarSign"
                format="currency"
              />
              <MetricCard
                title="Новые пользователи"
                value={8945}
                change={12.4}
                icon="UserPlus"
              />
              <MetricCard
                title="Неактивные пользователи"
                value={15.6}
                change={-2.1}
                icon="UserX"
                format="percentage"
              />
            </div>

            {/* Session Metrics */}
            <Card className="bg-gradient-card backdrop-blur-sm border-gray-dark/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Icon name="Activity" size={20} className="mr-2 text-amber-accent" />
                  Метрики сессий за период
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-dark/30 rounded-lg">
                    <div className="text-2xl font-bold text-white mb-1">847,592</div>
                    <div className="text-sm text-gray-light">Общее количество сессий</div>
                  </div>
                  <div className="text-center p-4 bg-gray-dark/30 rounded-lg">
                    <div className="text-2xl font-bold text-white mb-1">12:34</div>
                    <div className="text-sm text-gray-light">Средняя длительность</div>
                  </div>
                  <div className="text-center p-4 bg-gray-dark/30 rounded-lg">
                    <div className="text-2xl font-bold text-white mb-1">2.8</div>
                    <div className="text-sm text-gray-light">Сессий на пользователя</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="animate-fade-in space-y-6">
            {/* Comparison Period Selection */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-card backdrop-blur-sm border-gray-dark/30">
                <CardHeader>
                  <CardTitle className="text-amber-accent flex items-center">
                    <Icon name="Calendar" size={18} className="mr-2" />
                    Период A
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-light text-sm">С:</span>
                    <Button variant="outline" className="flex-1 bg-gray-dark/50 border-gray-dark text-white">
                      01 августа 2024
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-light text-sm">По:</span>
                    <Button variant="outline" className="flex-1 bg-gray-dark/50 border-gray-dark text-white">
                      31 августа 2024
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card backdrop-blur-sm border-gray-dark/30">
                <CardHeader>
                  <CardTitle className="text-pink-accent flex items-center">
                    <Icon name="Calendar" size={18} className="mr-2" />
                    Период B
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-light text-sm">С:</span>
                    <Button variant="outline" className="flex-1 bg-gray-dark/50 border-gray-dark text-white">
                      01 сентября 2024
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-light text-sm">По:</span>
                    <Button variant="outline" className="flex-1 bg-gray-dark/50 border-gray-dark text-white">
                      24 сентября 2024
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Comparison Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-card backdrop-blur-sm border-gray-dark/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="BarChart3" size={20} className="mr-2 text-amber-accent" />
                    DAU Сравнение
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-amber-accent rounded"></div>
                        <span className="text-gray-light">Август</span>
                      </div>
                      <span className="text-white font-semibold">10,542</span>
                    </div>
                    <Progress value={60} className="h-3 bg-gray-dark" />
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-pink-accent rounded"></div>
                        <span className="text-gray-light">Сентябрь</span>
                      </div>
                      <span className="text-white font-semibold">12,547</span>
                    </div>
                    <Progress value={72} className="h-3 bg-gray-dark" />

                    <div className="pt-2 text-center">
                      <span className="text-green-500 font-semibold">+19.0%</span>
                      <span className="text-gray-light text-sm ml-2">рост</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card backdrop-blur-sm border-gray-dark/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="DollarSign" size={20} className="mr-2 text-pink-accent" />
                    Доход Сравнение
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-amber-accent rounded"></div>
                        <span className="text-gray-light">Август</span>
                      </div>
                      <span className="text-white font-semibold">$74,820</span>
                    </div>
                    <Progress value={45} className="h-3 bg-gray-dark" />
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-pink-accent rounded"></div>
                        <span className="text-gray-light">Сентябрь</span>
                      </div>
                      <span className="text-white font-semibold">$89,420</span>
                    </div>
                    <Progress value={54} className="h-3 bg-gray-dark" />

                    <div className="pt-2 text-center">
                      <span className="text-green-500 font-semibold">+19.5%</span>
                      <span className="text-gray-light text-sm ml-2">рост</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Differences */}
            <Card className="bg-gradient-card backdrop-blur-sm border-gray-dark/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Icon name="TrendingUp" size={20} className="mr-2 text-amber-accent" />
                  Ключевые различия
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-dark/30 rounded-lg">
                    <Icon name="Users" size={24} className="mx-auto mb-2 text-green-500" />
                    <div className="text-lg font-bold text-green-500 mb-1">+2,005</div>
                    <div className="text-xs text-gray-light">Больше активных пользователей</div>
                  </div>
                  <div className="text-center p-4 bg-gray-dark/30 rounded-lg">
                    <Icon name="DollarSign" size={24} className="mx-auto mb-2 text-green-500" />
                    <div className="text-lg font-bold text-green-500 mb-1">+$14,600</div>
                    <div className="text-xs text-gray-light">Больше дохода</div>
                  </div>
                  <div className="text-center p-4 bg-gray-dark/30 rounded-lg">
                    <Icon name="Percent" size={24} className="mx-auto mb-2 text-amber-accent" />
                    <div className="text-lg font-bold text-amber-accent mb-1">+2.1%</div>
                    <div className="text-xs text-gray-light">Лучше retention</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monetization" className="animate-fade-in space-y-6">
            {/* Revenue Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <MetricCard
                title="Донат сегодня"
                value={5420}
                change={8.4}
                icon="DollarSign"
                format="currency"
              />
              <MetricCard
                title="Донат за все время"
                value={2847650}
                icon="TrendingUp"
                format="currency"
              />
              <MetricCard
                title="ARPU"
                value={5.68}
                change={3.2}
                icon="User"
                format="currency"
              />
              <MetricCard
                title="ARPPU"
                value={24.50}
                change={-1.8}
                icon="CreditCard"
                format="currency"
              />
            </div>

            {/* Retention Rate Calculator */}
            <Card className="bg-gradient-card backdrop-blur-sm border-gray-dark/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Icon name="Calculator" size={20} className="mr-2 text-amber-accent" />
                  Retention Rate за N дней
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-4">
                  <div className="flex-1">
                    <label className="text-gray-light text-sm mb-2 block">Количество дней:</label>
                    <input 
                      type="number" 
                      defaultValue="7"
                      className="w-full px-3 py-2 bg-gray-dark/50 border border-gray-dark rounded-lg text-white focus:border-amber-accent focus:outline-none"
                      placeholder="Введите количество дней"
                    />
                  </div>
                  <Button className="bg-amber-accent text-dark-navy hover:bg-amber-accent/90">
                    <Icon name="Search" size={16} className="mr-2" />
                    Рассчитать
                  </Button>
                </div>
                <div className="mt-6 p-4 bg-gray-dark/30 rounded-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-accent mb-2">28.7%</div>
                    <div className="text-gray-light">Retention Rate за 7 дней</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-card backdrop-blur-sm border-gray-dark/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="PieChart" size={20} className="mr-2 text-pink-accent" />
                    Распределение доходов
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-amber-accent rounded-full"></div>
                        <span className="text-gray-light">Премиум подписка</span>
                      </div>
                      <span className="text-white font-semibold">45%</span>
                    </div>
                    <Progress value={45} className="h-2 bg-gray-dark" />
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-pink-accent rounded-full"></div>
                        <span className="text-gray-light">Внутриигровые покупки</span>
                      </div>
                      <span className="text-white font-semibold">35%</span>
                    </div>
                    <Progress value={35} className="h-2 bg-gray-dark" />

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="text-gray-light">Реклама</span>
                      </div>
                      <span className="text-white font-semibold">20%</span>
                    </div>
                    <Progress value={20} className="h-2 bg-gray-dark" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card backdrop-blur-sm border-gray-dark/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="Target" size={20} className="mr-2 text-amber-accent" />
                    Топ покупок
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-dark/30 rounded-lg">
                      <div>
                        <div className="text-white font-medium">Золотой пакет</div>
                        <div className="text-gray-light text-sm">$9.99</div>
                      </div>
                      <div className="text-amber-accent font-bold">1,247</div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-dark/30 rounded-lg">
                      <div>
                        <div className="text-white font-medium">Энергия x50</div>
                        <div className="text-gray-light text-sm">$2.99</div>
                      </div>
                      <div className="text-pink-accent font-bold">892</div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-dark/30 rounded-lg">
                      <div>
                        <div className="text-white font-medium">Премиум месяц</div>
                        <div className="text-gray-light text-sm">$19.99</div>
                      </div>
                      <div className="text-green-500 font-bold">534</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="gaming" className="animate-fade-in space-y-6">
            {/* Quest Completion */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-card backdrop-blur-sm border-gray-dark/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center text-lg">
                    <Icon name="Target" size={18} className="mr-2 text-amber-accent" />
                    Квест "Новичок"
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-light">Завершено:</span>
                      <span className="text-white font-semibold">87.3%</span>
                    </div>
                    <Progress value={87.3} className="h-2 bg-gray-dark" />
                    <div className="text-xs text-gray-light">3,482 из 3,987 игроков</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card backdrop-blur-sm border-gray-dark/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center text-lg">
                    <Icon name="Sword" size={18} className="mr-2 text-pink-accent" />
                    Квест "Воин"
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-light">Завершено:</span>
                      <span className="text-white font-semibold">64.8%</span>
                    </div>
                    <Progress value={64.8} className="h-2 bg-gray-dark" />
                    <div className="text-xs text-gray-light">2,584 из 3,987 игроков</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card backdrop-blur-sm border-gray-dark/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center text-lg">
                    <Icon name="Crown" size={18} className="mr-2 text-yellow-500" />
                    Квест "Мастер"
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-light">Завершено:</span>
                      <span className="text-white font-semibold">23.1%</span>
                    </div>
                    <Progress value={23.1} className="h-2 bg-gray-dark" />
                    <div className="text-xs text-gray-light">921 из 3,987 игроков</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Custom Period Settings */}
            <Card className="bg-gradient-card backdrop-blur-sm border-gray-dark/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Icon name="Settings" size={20} className="mr-2 text-amber-accent" />
                  Настройка периодов анализа
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-gray-light text-sm mb-2 block">Retention 1 день:</label>
                    <input 
                      type="number" 
                      defaultValue="1"
                      className="w-full px-3 py-2 bg-gray-dark/50 border border-gray-dark rounded-lg text-white focus:border-amber-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-gray-light text-sm mb-2 block">Retention 3 дня:</label>
                    <input 
                      type="number" 
                      defaultValue="3"
                      className="w-full px-3 py-2 bg-gray-dark/50 border border-gray-dark rounded-lg text-white focus:border-pink-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-gray-light text-sm mb-2 block">Retention 7 дней:</label>
                    <input 
                      type="number" 
                      defaultValue="7"
                      className="w-full px-3 py-2 bg-gray-dark/50 border border-gray-dark rounded-lg text-white focus:border-amber-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-gray-light text-sm mb-2 block">Retention 30 дней:</label>
                    <input 
                      type="number" 
                      defaultValue="30"
                      className="w-full px-3 py-2 bg-gray-dark/50 border border-gray-dark rounded-lg text-white focus:border-pink-accent focus:outline-none"
                    />
                  </div>
                </div>
                <Button className="mt-4 bg-gradient-gaming text-white">
                  <Icon name="RefreshCw" size={16} className="mr-2" />
                  Обновить метрики
                </Button>
              </CardContent>
            </Card>

            {/* Game Statistics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-card backdrop-blur-sm border-gray-dark/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="Gift" size={20} className="mr-2 text-pink-accent" />
                    Промокоды и тикеты
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-dark/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="Ticket" size={20} className="text-amber-accent" />
                      <span className="text-white">Использовано промокодов</span>
                    </div>
                    <span className="text-amber-accent font-bold text-lg">1,247</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-dark/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="MessageSquare" size={20} className="text-pink-accent" />
                      <span className="text-white">Поддержка тикетов</span>
                    </div>
                    <span className="text-pink-accent font-bold text-lg">89</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-dark/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="ShieldX" size={20} className="text-red-500" />
                      <span className="text-white">Заблокировано аккаунтов</span>
                    </div>
                    <span className="text-red-500 font-bold text-lg">23</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card backdrop-blur-sm border-gray-dark/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="Trophy" size={20} className="mr-2 text-yellow-500" />
                    Достижения игроков
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-light">Первая победа</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={95.2} className="w-20 h-2 bg-gray-dark" />
                        <span className="text-white font-semibold text-sm">95.2%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-light">10 побед подряд</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={67.8} className="w-20 h-2 bg-gray-dark" />
                        <span className="text-white font-semibold text-sm">67.8%</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-light">Легендарный ранг</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={12.4} className="w-20 h-2 bg-gray-dark" />
                        <span className="text-white font-semibold text-sm">12.4%</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-light">Полная коллекция</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={3.7} className="w-20 h-2 bg-gray-dark" />
                        <span className="text-white font-semibold text-sm">3.7%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default GameAnalytics;