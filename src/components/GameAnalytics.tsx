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
  const [date, setDate] = useState&lt;Date | undefined&gt;(new Date());

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
  }) =&gt; {
    const formatValue = (val: number) =&gt; {
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
      &lt;Card className={`bg-gradient-card backdrop-blur-sm border-gray-dark/30 hover:border-amber-accent/50 transition-all duration-300 animate-scale-in ${className}`}&gt;
        &lt;CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3"&gt;
          &lt;CardTitle className="text-sm font-medium text-gray-light"&gt;{title}&lt;/CardTitle&gt;
          &lt;div className="p-2 rounded-lg bg-gradient-gaming"&gt;
            &lt;Icon name={icon} size={16} className="text-amber-accent" /&gt;
          &lt;/div&gt;
        &lt;/CardHeader&gt;
        &lt;CardContent&gt;
          &lt;div className="text-2xl font-bold text-white mb-2"&gt;
            {formatValue(value)}
          &lt;/div&gt;
          {change !== undefined && (
            &lt;div className="flex items-center text-xs"&gt;
              &lt;Icon 
                name={change &gt; 0 ? "TrendingUp" : "TrendingDown"} 
                size={12} 
                className={change &gt; 0 ? "text-green-500" : "text-red-500"} 
              /&gt;
              &lt;span className={change &gt; 0 ? "text-green-500 ml-1" : "text-red-500 ml-1"}&gt;
                {Math.abs(change)}%
              &lt;/span&gt;
              &lt;span className="text-gray-light ml-1"&gt;за неделю&lt;/span&gt;
            &lt;/div&gt;
          )}
        &lt;/CardContent&gt;
      &lt;/Card&gt;
    );
  };

  const RetentionChart = ({ data }: { data: { [key: string]: number } }) =&gt; (
    &lt;Card className="bg-gradient-card backdrop-blur-sm border-gray-dark/30"&gt;
      &lt;CardHeader&gt;
        &lt;CardTitle className="text-white flex items-center"&gt;
          &lt;Icon name="Users" size={20} className="mr-2 text-amber-accent" /&gt;
          Retention Rate
        &lt;/CardTitle&gt;
        &lt;CardDescription className="text-gray-light"&gt;
          Процент удержания пользователей
        &lt;/CardDescription&gt;
      &lt;/CardHeader&gt;
      &lt;CardContent className="space-y-4"&gt;
        {Object.entries(data).map(([key, value]) =&gt; (
          &lt;div key={key} className="space-y-2"&gt;
            &lt;div className="flex justify-between text-sm"&gt;
              &lt;span className="text-gray-light"&gt;День {key.replace('retention', '')}&lt;/span&gt;
              &lt;span className="text-white font-semibold"&gt;{value}%&lt;/span&gt;
            &lt;/div&gt;
            &lt;Progress 
              value={value} 
              className="h-2 bg-gray-dark"
            /&gt;
          &lt;/div&gt;
        ))}
      &lt;/CardContent&gt;
    &lt;/Card&gt;
  );

  return (
    &lt;div className="min-h-screen bg-dark-navy text-white font-['Roboto']"&gt;
      {/* Header */}
      &lt;header className="sticky top-0 z-50 bg-dark-navy/95 backdrop-blur-sm border-b border-gray-dark/30"&gt;
        &lt;div className="container mx-auto px-4 py-4"&gt;
          &lt;div className="flex items-center justify-between"&gt;
            &lt;div className="flex items-center space-x-3"&gt;
              &lt;div className="p-2 rounded-xl bg-gradient-gaming animate-pulse-glow"&gt;
                &lt;Icon name="BarChart3" size={24} className="text-amber-accent" /&gt;
              &lt;/div&gt;
              &lt;div&gt;
                &lt;h1 className="text-2xl font-bold text-white"&gt;Gaming Analytics&lt;/h1&gt;
                &lt;p className="text-gray-light text-sm"&gt;Панель аналитики игровых метрик&lt;/p&gt;
              &lt;/div&gt;
            &lt;/div&gt;
            &lt;div className="flex items-center space-x-2"&gt;
              &lt;Button 
                variant="outline" 
                size="sm" 
                className="border-gray-dark text-gray-light hover:border-amber-accent hover:text-amber-accent transition-colors"
              &gt;
                &lt;Icon name="Download" size={16} className="mr-2" /&gt;
                Экспорт
              &lt;/Button&gt;
              &lt;Badge variant="outline" className="border-green-500 text-green-500 animate-pulse"&gt;
                Live
              &lt;/Badge&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/header&gt;

      {/* Main Content */}
      &lt;main className="container mx-auto px-4 py-8"&gt;
        &lt;Tabs defaultValue="overview" className="space-y-8"&gt;
          &lt;TabsList className="bg-gray-dark/50 border border-gray-dark/30 p-1 rounded-xl"&gt;
            &lt;TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-gradient-gaming data-[state=active]:text-white px-6 py-2 rounded-lg transition-all duration-300"
            &gt;
              &lt;Icon name="Home" size={16} className="mr-2" /&gt;
              Общие метрики
            &lt;/TabsTrigger&gt;
            &lt;TabsTrigger 
              value="period"
              className="data-[state=active]:bg-gradient-gaming data-[state=active]:text-white px-6 py-2 rounded-lg transition-all duration-300"
            &gt;
              &lt;Icon name="Calendar" size={16} className="mr-2" /&gt;
              Период метрик
            &lt;/TabsTrigger&gt;
            &lt;TabsTrigger 
              value="comparison"
              className="data-[state=active]:bg-gradient-gaming data-[state=active]:text-white px-6 py-2 rounded-lg transition-all duration-300"
            &gt;
              &lt;Icon name="BarChart" size={16} className="mr-2" /&gt;
              Сравнение
            &lt;/TabsTrigger&gt;
            &lt;TabsTrigger 
              value="monetization"
              className="data-[state=active]:bg-gradient-gaming data-[state=active]:text-white px-6 py-2 rounded-lg transition-all duration-300"
            &gt;
              &lt;Icon name="DollarSign" size={16} className="mr-2" /&gt;
              Донат метрики
            &lt;/TabsTrigger&gt;
            &lt;TabsTrigger 
              value="gaming"
              className="data-[state=active]:bg-gradient-gaming data-[state=active]:text-white px-6 py-2 rounded-lg transition-all duration-300"
            &gt;
              &lt;Icon name="Gamepad2" size={16} className="mr-2" /&gt;
              Игровые метрики
            &lt;/TabsTrigger&gt;
          &lt;/TabsList&gt;

          &lt;TabsContent value="overview" className="space-y-8 animate-fade-in"&gt;
            {/* Date Picker */}
            &lt;div className="flex items-center space-x-4"&gt;
              &lt;Icon name="Calendar" size={20} className="text-amber-accent" /&gt;
              &lt;span className="text-gray-light"&gt;Данные за:&lt;/span&gt;
              &lt;Popover&gt;
                &lt;PopoverTrigger asChild&gt;
                  &lt;Button
                    variant="outline"
                    className="bg-gray-dark/50 border-gray-dark hover:border-amber-accent hover:bg-gray-dark text-white"
                  &gt;
                    &lt;Icon name="Calendar" size={16} className="mr-2" /&gt;
                    {date ? format(date, 'dd MMMM yyyy', { locale: ru }) : 'Выберите дату'}
                  &lt;/Button&gt;
                &lt;/PopoverTrigger&gt;
                &lt;PopoverContent className="w-auto p-0 bg-gray-dark border-gray-dark/30"&gt;
                  &lt;Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="text-white"
                  /&gt;
                &lt;/PopoverContent&gt;
              &lt;/Popover&gt;
            &lt;/div&gt;

            {/* Key Metrics Grid */}
            &lt;div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 animate-slide-up"&gt;
              &lt;MetricCard
                title="DAU (Daily Active Users)"
                value={metrics.dau.value}
                change={metrics.dau.change}
                icon="Users"
              /&gt;
              &lt;MetricCard
                title="WAU (Weekly Active Users)"
                value={metrics.wau.value}
                change={metrics.wau.change}
                icon="UserCheck"
              /&gt;
              &lt;MetricCard
                title="MAU (Monthly Active Users)"
                value={metrics.mau.value}
                change={metrics.mau.change}
                icon="UsersRound"
              /&gt;
              &lt;MetricCard
                title="Доход за день"
                value={metrics.revenue.value}
                change={metrics.revenue.change}
                icon="DollarSign"
                format="currency"
              /&gt;
            &lt;/div&gt;

            {/* Monetization Metrics */}
            &lt;div className="grid grid-cols-1 md:grid-cols-3 gap-6"&gt;
              &lt;MetricCard
                title="ARPU (Avg Revenue Per User)"
                value={metrics.arpu.value}
                change={metrics.arpu.change}
                icon="TrendingUp"
                format="currency"
              /&gt;
              &lt;MetricCard
                title="ARPPU (Avg Revenue Per Paying User)"
                value={metrics.arppu.value}
                change={metrics.arppu.change}
                icon="CreditCard"
                format="currency"
              /&gt;
              &lt;RetentionChart 
                data={{
                  retention1: metrics.retention1,
                  retention3: metrics.retention3,
                  retention7: metrics.retention7,
                  retention30: metrics.retention30
                }} 
              /&gt;
            &lt;/div&gt;

            {/* Quick Actions */}
            &lt;div className="flex flex-wrap gap-4 pt-4"&gt;
              &lt;Button 
                variant="outline"
                className="border-amber-accent text-amber-accent hover:bg-amber-accent hover:text-dark-navy transition-colors"
              &gt;
                &lt;Icon name="Zap" size={16} className="mr-2" /&gt;
                Быстрая аналитика
              &lt;/Button&gt;
              &lt;Button 
                variant="outline"
                className="border-pink-accent text-pink-accent hover:bg-pink-accent hover:text-white transition-colors"
              &gt;
                &lt;Icon name="Bell" size={16} className="mr-2" /&gt;
                Настроить уведомления
              &lt;/Button&gt;
            &lt;/div&gt;
          &lt;/TabsContent&gt;

          &lt;TabsContent value="period" className="animate-fade-in"&gt;
            &lt;Card className="bg-gradient-card backdrop-blur-sm border-gray-dark/30"&gt;
              &lt;CardHeader&gt;
                &lt;CardTitle className="text-white"&gt;Метрики за период&lt;/CardTitle&gt;
                &lt;CardDescription className="text-gray-light"&gt;
                  Анализ данных за выбранный период времени
                &lt;/CardDescription&gt;
              &lt;/CardHeader&gt;
              &lt;CardContent&gt;
                &lt;div className="text-center py-12 text-gray-light"&gt;
                  &lt;Icon name="Clock" size={48} className="mx-auto mb-4 text-amber-accent" /&gt;
                  &lt;p&gt;Выберите период для анализа метрик&lt;/p&gt;
                &lt;/div&gt;
              &lt;/CardContent&gt;
            &lt;/Card&gt;
          &lt;/TabsContent&gt;

          &lt;TabsContent value="comparison" className="animate-fade-in"&gt;
            &lt;Card className="bg-gradient-card backdrop-blur-sm border-gray-dark/30"&gt;
              &lt;CardHeader&gt;
                &lt;CardTitle className="text-white"&gt;Сравнение метрик&lt;/CardTitle&gt;
                &lt;CardDescription className="text-gray-light"&gt;
                  Сравнительный анализ показателей
                &lt;/CardDescription&gt;
              &lt;/CardHeader&gt;
              &lt;CardContent&gt;
                &lt;div className="text-center py-12 text-gray-light"&gt;
                  &lt;Icon name="BarChart" size={48} className="mx-auto mb-4 text-pink-accent" /&gt;
                  &lt;p&gt;Выберите периоды для сравнения&lt;/p&gt;
                &lt;/div&gt;
              &lt;/CardContent&gt;
            &lt;/Card&gt;
          &lt;/TabsContent&gt;

          &lt;TabsContent value="monetization" className="animate-fade-in"&gt;
            &lt;Card className="bg-gradient-card backdrop-blur-sm border-gray-dark/30"&gt;
              &lt;CardHeader&gt;
                &lt;CardTitle className="text-white"&gt;Монетизация&lt;/CardTitle&gt;
                &lt;CardDescription className="text-gray-light"&gt;
                  Детальная аналитика доходов и платежей
                &lt;/CardDescription&gt;
              &lt;/CardHeader&gt;
              &lt;CardContent&gt;
                &lt;div className="text-center py-12 text-gray-light"&gt;
                  &lt;Icon name="DollarSign" size={48} className="mx-auto mb-4 text-amber-accent" /&gt;
                  &lt;p&gt;Анализ доходности и монетизации&lt;/p&gt;
                &lt;/div&gt;
              &lt;/CardContent&gt;
            &lt;/Card&gt;
          &lt;/TabsContent&gt;

          &lt;TabsContent value="gaming" className="animate-fade-in"&gt;
            &lt;Card className="bg-gradient-card backdrop-blur-sm border-gray-dark/30"&gt;
              &lt;CardHeader&gt;
                &lt;CardTitle className="text-white"&gt;Игровые метрики&lt;/CardTitle&gt;
                &lt;CardDescription className="text-gray-light"&gt;
                  Специфические игровые показатели и достижения
                &lt;/CardDescription&gt;
              &lt;/CardHeader&gt;
              &lt;CardContent&gt;
                &lt;div className="text-center py-12 text-gray-light"&gt;
                  &lt;Icon name="Gamepad2" size={48} className="mx-auto mb-4 text-pink-accent" /&gt;
                  &lt;p&gt;Статистика игрового процесса и достижений&lt;/p&gt;
                &lt;/div&gt;
              &lt;/CardContent&gt;
            &lt;/Card&gt;
          &lt;/TabsContent&gt;
        &lt;/Tabs&gt;
      &lt;/main&gt;
    &lt;/div&gt;
  );
};

export default GameAnalytics;