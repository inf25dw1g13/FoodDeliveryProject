// Dashboard criado com ajuda artificial. Maior dificuldade: centrar os cards
import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Box,
    Grid,
    Chip,
    Avatar,
    LinearProgress,
    Paper,
    useTheme,
    alpha,
    Stack
} from '@mui/material';
import {
    Restaurant,
    ShoppingCart,
    TrendingUp,
    LocalShipping,
    People,
    Fastfood,
    AttachMoney,
    CheckCircle,
    Cancel,
    Store,
    DeliveryDining,
    Category,
} from '@mui/icons-material';
import { useGetList } from 'react-admin';

// COMPONENTE CARTÃO DE ESTATÍSTICA
const StatCard = ({ title, value, subtitle, icon: Icon, color, isDark }) => {
    const bgGradient = isDark 
        ? `linear-gradient(135deg, ${alpha(color, 0.2)} 0%, ${alpha(color, 0.05)} 100%)`
        : `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.7)} 100%)`;
    
    return (
        <Card 
            sx={{ 
                height: 180, 
                minWidth: 280,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: bgGradient,
                borderRadius: 3,
                border: isDark ? `1px solid ${alpha(color, 0.3)}` : 'none',
                transition: 'all 0.3s',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 12px 24px ${alpha(color, 0.4)}`,
                }
            }}
        >
            <CardContent sx={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column',
                p: 2, 
                pb: '16px !important' 
            }}>
                {/* Linha Superior: Ícone */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                    <Avatar sx={{ bgcolor: alpha('#fff', 0.2), width: 48, height: 48 }}>
                        <Icon sx={{ color: '#fff', fontSize: 24 }} />
                    </Avatar>
                </Box>

                {/* Área de Texto: SUBIDA COM MARGEM NEGATIVA */}
                <Box sx={{ 
                    flexGrow: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center',     
                    textAlign: 'center',      
                    mt: -2 // <<--- AQUI: Margem negativa para puxar o texto para cima (para o meio visual)
                }}>
                    <Typography variant="body2" sx={{ color: alpha('#fff', 0.9), fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem', mb: 0.5 }}>
                        {title}
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#fff', fontSize: '2.2rem', lineHeight: 1 }}>
                        {value}
                    </Typography>
                    {subtitle && (
                        <Typography variant="caption" sx={{ color: alpha('#fff', 0.8), mt: 0.5, display: 'block', fontSize: '0.85rem' }}>
                            {subtitle}
                        </Typography>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

// GRÁFICO MÉTODOS DE PAGAMENTO
const PaymentMethodsChart = ({ pedidos, isDark }) => {

    const pedidosArray = Array.isArray(pedidos) ? pedidos : [];
    
    const paymentData = pedidosArray.reduce((acc, p) => {
        if (!p) return acc; 
        const method = (p.metodo_pagamento || 'Outro').toLowerCase().trim();
        if (method) {
            acc[method] = (acc[method] || 0) + 1;
        }
        return acc;
    }, {});

    const COLORS = {
        'cartao': '#2196f3',
        'mbway': '#4caf50',
        'multibanco': '#ff9800',
        'paypal': '#f44336',
        'dinheiro': '#9c27b0',
        'outro': '#00bcd4'
    };

    const data = Object.entries(paymentData).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
        percentage: pedidosArray.length > 0 ? ((value / pedidosArray.length) * 100).toFixed(1) : 0,
        color: COLORS[name.toLowerCase()] || '#00bcd4'
    })).sort((a, b) => b.value - a.value);

    return (
        <Card sx={{ height: 450, borderRadius: 3, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: 2, pb: 0, flexShrink: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AttachMoney sx={{ mr: 1.5, color: '#4caf50', fontSize: 28 }} />
                    <Typography variant="h6" fontWeight="700">Métodos Pagamento</Typography>
                </Box>
            </CardContent>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 2, pb: 2 }}>
                {data.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                        Nenhum método de pagamento encontrado
                    </Typography>
                ) : (
                <Stack spacing={2}>
                    {data.map((item) => (
                        <Paper key={item.name} sx={{ p: 2, bgcolor: alpha(item.color, 0.1), border: `1px solid ${alpha(item.color, 0.3)}`, borderRadius: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body1" fontWeight={600}>{item.name}</Typography>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Typography variant="h6" fontWeight={800}>{item.value}</Typography>
                                    <Chip label={`${item.percentage}%`} size="small" sx={{ bgcolor: item.color, color: '#fff', fontWeight: 700, minWidth: 60 }} />
                                </Box>
                            </Box>
                            <LinearProgress variant="determinate" value={parseFloat(item.percentage)} sx={{ height: 8, borderRadius: 4, '& .MuiLinearProgress-bar': { bgcolor: item.color } }} />
                        </Paper>
                    ))}
                </Stack>
                )}
            </Box>
        </Card>
    );
};

// LISTA DE TOP RESTAURANTES
const TopRestaurants = ({ pedidos, restaurantes, isDark }) => {
    const restaurantSales = pedidos?.reduce((acc, p) => {
        if (p.restaurante_id) {
            if (!acc[p.restaurante_id]) acc[p.restaurante_id] = { total: 0, orders: 0 };
            acc[p.restaurante_id].total += (p.total || 0);
            acc[p.restaurante_id].orders += 1;
        }
        return acc;
    }, {}) || {};

    const topRestaurants = Object.entries(restaurantSales)
        .sort(([, a], [, b]) => b.total - a.total)
        .slice(0, 10)
        .map(([id, data], index) => ({
            nome: restaurantes?.find(r => r.id === parseInt(id))?.nome || `Restaurante #${id}`,
            total: data.total,
            orders: data.orders,
            rank: index + 1
        }));

    const rankStyles = {
        1: { bg: alpha('#FFD700', 0.15), color: '#FFA000', borderColor: '#FFD700', fontWeight: 600 },
        2: { bg: alpha('#C0C0C0', 0.15), color: '#757575', borderColor: '#C0C0C0', fontWeight: 600 },
        3: { bg: alpha('#CD7F32', 0.15), color: '#8D6E63', borderColor: '#CD7F32', fontWeight: 600 }
    };

    return (
        <Card sx={{ height: 450, borderRadius: 3, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: 2, pb: 0, flexShrink: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TrendingUp sx={{ mr: 1.5, color: '#FFD700', fontSize: 28 }} />
                    <Typography variant="h6" fontWeight="700">Top Restaurantes</Typography>
                </Box>
            </CardContent>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 2, pb: 2 }}>
                <Stack spacing={1.5}>
                    {topRestaurants.map((r) => {
                        const rankStyle = rankStyles[r.rank] || { bg: alpha(isDark ? '#fff' : '#000', 0.03), color: 'text.primary', borderColor: 'transparent', fontWeight: 600 };
                        return (
                            <Paper key={r.rank} sx={{ 
                                p: 2, 
                                bgcolor: rankStyle.bg, 
                                border: r.rank <= 3 ? `2px solid ${rankStyle.borderColor}` : '1px solid',
                                borderColor: r.rank <= 3 ? rankStyle.borderColor : alpha(isDark ? '#fff' : '#000', 0.1),
                                borderRadius: 2 
                            }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Box sx={{ 
                                            minWidth: 32,
                                            height: 32,
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            bgcolor: r.rank <= 3 ? rankStyle.color : alpha(isDark ? '#fff' : '#000', 0.1),
                                            color: r.rank <= 3 ? '#fff' : 'text.secondary',
                                            fontWeight: rankStyle.fontWeight,
                                            fontSize: '0.875rem',
                                            flexShrink: 0
                                        }}>
                                            {r.rank}
                                        </Box>
                                        <Box sx={{ minWidth: 0, flex: 1 }}>
                                            <Typography variant="body1" fontWeight={rankStyle.fontWeight} noWrap>{r.nome}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', pl: 5 }}>
                                        <Typography variant="caption" color="text.secondary">{r.orders} pedidos</Typography>
                                        <Typography variant="h6" fontWeight={800} color="primary.main">
                                            {r.total > 0 ? `${r.total.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €` : '0,00 €'}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        );
                    })}
                </Stack>
            </Box>
        </Card>
    );
};

//STATUS RESTAURANTES
const RestaurantStatus = ({ restaurantes, isDark }) => {

    const restaurantesArray = Array.isArray(restaurantes) ? restaurantes : [];
    
    const estados = restaurantesArray.reduce((acc, r) => {
        if (!r) return acc; 
        const estado = (r.estado || 'fechado').toLowerCase().trim();
        if (estado) {
            acc[estado] = (acc[estado] || 0) + 1;
        }
        return acc;
    }, {});

    const statusConfig = {
        'aberto': { label: 'Abertos', color: '#4caf50', icon: <CheckCircle /> },
        'fechado': { label: 'Fechados', color: '#f44336', icon: <Cancel /> }
    };

    const total = restaurantesArray.length || 1;

    return (
        <Card sx={{ height: 450, borderRadius: 3, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: 2, pb: 0, flexShrink: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Store sx={{ mr: 1.5, color: 'primary.main', fontSize: 28 }} />
                    <Typography variant="h6" fontWeight="700">Estado Restaurantes</Typography>
                </Box>
            </CardContent>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', px: 2, pb: 2 }}>
                {Object.keys(estados).length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                        Nenhum estado de restaurante encontrado
                    </Typography>
                ) : (
                <Stack spacing={3}>
                    {Object.entries(estados).map(([estado, count]) => {
                        const config = statusConfig[estado] || { label: estado, color: '#757575', icon: <Store /> };
                        const percentage = (count / total) * 100;
                        return (
                            <Box key={estado}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        {React.cloneElement(config.icon, { sx: { fontSize: 20, color: config.color, mr: 1 } })}
                                        <Typography variant="body2" fontWeight={600}>{config.label}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                                        <Typography variant="h6" fontWeight={800}>{count}</Typography>
                                        <Chip label={`${percentage.toFixed(0)}%`} size="small" sx={{ bgcolor: alpha(config.color, 0.15), color: config.color, fontWeight: 700, minWidth: 60 }} />
                                    </Box>
                                </Box>
                                <LinearProgress variant="determinate" value={percentage} sx={{ height: 10, borderRadius: 5, '& .MuiLinearProgress-bar': { bgcolor: config.color } }} />
                            </Box>
                        );
                    })}
                </Stack>
                )}
            </Box>
        </Card>
    );
};

//STATUS ENTREGAS
const DeliveryStats = ({ entregas, isDark }) => {

    const entregasArray = Array.isArray(entregas) ? entregas : [];
    
    const estadosEntrega = entregasArray.reduce((acc, e) => {
        if (!e) return acc;
        const estado = (e.estado || 'pendente').toLowerCase().trim();
        if (estado) {
            acc[estado] = (acc[estado] || 0) + 1;
        }
        return acc;
    }, {});

    const statusConfig = {
        'pendente': { label: 'Pendente', color: '#9e9e9e' },
        'a_caminho': { label: 'A Caminho', color: '#2196f3' },
        'entregue': { label: 'Entregue', color: '#4caf50' },
        'cancelado': { label: 'Cancelado', color: '#f44336' }
    };

    const data = Object.entries(estadosEntrega).map(([estado, value]) => ({
        name: statusConfig[estado]?.label || estado,
        value,
        color: statusConfig[estado]?.color || '#757575'
    })).sort((a, b) => b.value - a.value);

    const total = entregasArray.length || 1;

    return (
        <Card sx={{ height: 450, borderRadius: 3, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: 2, pb: 0, flexShrink: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocalShipping sx={{ mr: 1.5, color: '#1f63bb', fontSize: 28 }} />
                    <Typography variant="h6" fontWeight="700">Estado Entregas</Typography>
                </Box>
            </CardContent>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', px: 2, pb: 2 }}>
                {data.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                        Nenhum estado de entrega encontrado
                    </Typography>
                ) : (
                <Stack spacing={2.5}>
                    {data.map((item) => {
                        const percentage = (item.value / total) * 100;
                        return (
                            <Box key={item.name}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2" fontWeight={600}>{item.name}</Typography>
                                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                                        <Typography variant="h6" fontWeight={800}>{item.value}</Typography>
                                        <Chip label={`${percentage.toFixed(0)}%`} size="small" sx={{ bgcolor: alpha(item.color, 0.15), color: item.color, fontWeight: 700, minWidth: 60 }} />
                                    </Box>
                                </Box>
                                <LinearProgress variant="determinate" value={percentage} sx={{ height: 10, borderRadius: 5, '& .MuiLinearProgress-bar': { bgcolor: item.color } }} />
                            </Box>
                        );
                    })}
                </Stack>
                )}
            </Box>
        </Card>
    );
};

//DASHBOARD PRINCIPAL
export const RestaurantDashboard = () => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const { data: restaurantes, isLoading: l1 } = useGetList('restaurantes', { 
        pagination: { page: 1, perPage: 1000 },
        sort: { field: 'id', order: 'ASC' }
    });
    const { data: pedidos, isLoading: l2 } = useGetList('pedidos', { 
        pagination: { page: 1, perPage: 10000 },
        sort: { field: 'id', order: 'ASC' }
    });
    const { data: pratos, isLoading: l3 } = useGetList('pratos', { 
        pagination: { page: 1, perPage: 10000 },
        sort: { field: 'id', order: 'ASC' }
    });
    const { data: clientes, isLoading: l4 } = useGetList('clientes', { 
        pagination: { page: 1, perPage: 10000 },
        sort: { field: 'id', order: 'ASC' }
    });
    const { data: entregas, isLoading: l5 } = useGetList('entregas', { 
        pagination: { page: 1, perPage: 10000 },
        sort: { field: 'id', order: 'ASC' }
    });
    const { data: entregadores, isLoading: l6 } = useGetList('entregadores', { 
        pagination: { page: 1, perPage: 1000 },
        sort: { field: 'id', order: 'ASC' }
    });
    const { data: categorias, isLoading: l7 } = useGetList('categorias-pratos', { 
        pagination: { page: 1, perPage: 1000 },
        sort: { field: 'id', order: 'ASC' }
    });

    if (l1 || l2 || l3 || l4 || l5 || l6 || l7) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress size={60} />
                <Typography variant="h6" sx={{ mt: 3, fontWeight: 600 }}>A carregar dashboard...</Typography>
            </Box>
        );
    }

    // 2. CÁLCULOS
    const totalRestaurantes = restaurantes?.length || 0;
    const totalPedidos = pedidos?.length || 0;
    const totalPratos = pratos?.length || 0;
    const totalClientes = clientes?.length || 0;
    const totalEntregas = entregas?.length || 0;
    const totalEntregadores = entregadores?.length || 0;
    const totalCategorias = categorias?.length || 0;

    const faturaçãoTotal = pedidos?.reduce((sum, p) => sum + (p.total || 0), 0) || 0;
    const valorMedio = totalPedidos > 0 ? faturaçãoTotal / totalPedidos : 0;

    const pedidosEntregues = entregas?.filter(e => e.estado === 'entregue').length || 0;
    const taxaEntrega = totalPedidos > 0 ? (pedidosEntregues / totalPedidos * 100).toFixed(1) : 0;

    const restaurantesAtivos = restaurantes?.filter(r => r.estado === 'aberto').length || 0;
    const entregadoresDisponiveis = entregadores?.filter(e => e.estado === 'disponivel').length || 0;

    // 3. RENDERIZAÇÃO
    return (
        <Box sx={{ bgcolor: isDark ? '#0a0a0a' : '#f5f7fa', minHeight: '100vh', py: 4, px: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ mb: 5, textAlign: 'center', maxWidth: 1400, width: '100%' }}>
                <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, background: 'linear-gradient(45deg, #1985ddff, #00d2eeff)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Food Delivery Dashboard
                </Typography>
                <Typography variant="body1" color="text.secondary">Um Sistema de Entregas e Restaurantes</Typography>
            </Box>

            <Box sx={{ maxWidth: '100%', width: '100%', px: 2 }}>
                
                {/* LINHA 1: KPIs Principais */}
                <Grid container spacing={3} sx={{ mb: 4 }} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <StatCard 
                            title="Faturação Total" 
                            value={faturaçãoTotal > 0 ? `${faturaçãoTotal.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €` : '0,00 €'} 
                            subtitle={valorMedio > 0 ? `Média por pedido: ${valorMedio.toFixed(2)} €` : 'Sem pedidos'} 
                            icon={AttachMoney} 
                            color="#4caf50" 
                            isDark={isDark} 
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <StatCard 
                            title="Pedidos Totais" 
                            value={totalPedidos} 
                            subtitle={`${taxaEntrega}% taxa de entrega`} 
                            icon={ShoppingCart} 
                            color="#2196f3" 
                            isDark={isDark} 
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <StatCard 
                            title="Total de Clientes" 
                            value={totalClientes} 
                            subtitle={`${totalPedidos > 0 && totalClientes > 0 ? (totalPedidos / totalClientes).toFixed(1) : 0} pedidos por cliente`} 
                            icon={People} 
                            color="#9c27b0" 
                            isDark={isDark} 
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <StatCard 
                            title="Restaurantes" 
                            value={totalRestaurantes} 
                            subtitle={`${restaurantesAtivos} abertos agora`} 
                            icon={Restaurant} 
                            color="#ff9800" 
                            isDark={isDark} 
                        />
                    </Grid>
                </Grid>

                {/* LINHA 2: KPIs Secundários */}
                <Grid container spacing={3} sx={{ mb: 4 }} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <StatCard title="Pratos Disponíveis" value={totalPratos} subtitle={`${totalRestaurantes > 0 ? (totalPratos / totalRestaurantes).toFixed(1) : 0} por restaurante`} icon={Fastfood} color="#e91e63" isDark={isDark} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <StatCard title="Entregas Totais" value={totalEntregas} subtitle={`${pedidosEntregues} concluídas`} icon={LocalShipping} color="#00bcd4" isDark={isDark} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <StatCard title="Entregadores" value={totalEntregadores} subtitle={`${entregadoresDisponiveis} disponíveis`} icon={DeliveryDining} color="#795548" isDark={isDark} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <StatCard 
                            title="Categorias" 
                            value={totalCategorias} 
                            subtitle={totalPratos > 0 && totalCategorias > 0 ? `${(totalPratos / totalCategorias).toFixed(1)} pratos por categoria` : 'Sem pratos'} 
                            icon={Category} 
                            color="#607d8b" 
                            isDark={isDark} 
                        />
                    </Grid>
                </Grid>

                {/* LINHA 3: Gráficos */}
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} md={6} lg={3}>
                        <PaymentMethodsChart pedidos={pedidos} isDark={isDark} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <TopRestaurants pedidos={pedidos} restaurantes={restaurantes} isDark={isDark} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <RestaurantStatus restaurantes={restaurantes} isDark={isDark} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <DeliveryStats entregas={entregas} isDark={isDark} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default RestaurantDashboard;
