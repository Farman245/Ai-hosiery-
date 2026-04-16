/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Receipt, 
  TrendingUp, 
  AlertTriangle, 
  Search, 
  Plus, 
  Filter, 
  MessageCircle, 
  Download, 
  ChevronRight,
  Menu,
  X,
  Bell,
  Settings,
  LogOut,
  ShoppingCart,
  Trash2,
  CheckCircle2,
  Info
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'motion/react';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Mock Data ---

const MOCK_SALES_DATA = [
  { month: 'Jan', sales: 450000, recovery: 380000 },
  { month: 'Feb', sales: 520000, recovery: 410000 },
  { month: 'Mar', sales: 480000, recovery: 450000 },
  { month: 'Apr', sales: 610000, recovery: 520000 },
  { month: 'May', sales: 550000, recovery: 490000 },
  { month: 'Jun', sales: 670000, recovery: 580000 },
];

const MOCK_INVENTORY = [
  { id: 1, name: 'Cotton Socks (White)', category: 'Socks', colors: ['White'], sizes: ['S', 'M', 'L'], stock: 120, price: 450, status: 'Adequate' },
  { id: 2, name: 'Woolen Winter Socks', category: 'Socks', colors: ['Grey', 'Black'], sizes: ['M', 'L'], stock: 15, price: 850, status: 'Low' },
  { id: 3, name: 'Men\'s Cotton Vest', category: 'Undergarments', colors: ['White'], sizes: ['38', '40', '42'], stock: 85, price: 1200, status: 'Adequate' },
  { id: 4, name: 'Premium Briefs (Pack of 3)', category: 'Undergarments', colors: ['Mix'], sizes: ['M', 'L', 'XL'], stock: 45, price: 1500, status: 'Adequate' },
  { id: 5, name: 'Kids Thermal Set', category: 'Winter Wear', colors: ['Blue', 'Pink'], sizes: ['22', '24', '26'], stock: 8, price: 2200, status: 'Low' },
  { id: 6, name: 'Sports Socks (Ankle)', category: 'Socks', colors: ['Black', 'White'], sizes: ['Free'], stock: 250, price: 350, status: 'Adequate' },
  { id: 7, name: 'Ladies Leggings', category: 'Apparel', colors: ['Black', 'Maroon'], sizes: ['Free'], stock: 60, price: 950, status: 'Adequate' },
];

const MOCK_RETAILERS = [
  { id: 1, name: 'Al-Madina Traders', owner: 'Sajid Khan', location: 'Faisalabad', balance: 45000, lastPayment: '2024-03-10' },
  { id: 2, name: 'Zubair General Store', owner: 'Zubair Ahmed', location: 'Lahore', balance: 12500, lastPayment: '2024-03-15' },
  { id: 3, name: 'Ittihad Hosiery', owner: 'M. Bilal', location: 'Gujranwala', balance: 89000, lastPayment: '2024-02-28' },
  { id: 4, name: 'Siddique Socks House', owner: 'Siddique Memon', location: 'Karachi', balance: 0, lastPayment: '2024-03-20' },
  { id: 5, name: 'New Fashion Point', owner: 'Aslam Pervez', location: 'Multan', balance: 32000, lastPayment: '2024-03-05' },
];

const CATEGORIES = ['All', 'Socks', 'Undergarments', 'Winter Wear', 'Apparel'];

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 px-6 py-3 transition-all duration-200 group text-left",
      active 
        ? "bg-primary text-white" 
        : "text-slate-200 hover:bg-slate-800"
    )}
  >
    <Icon size={18} className={cn(active ? "text-white" : "text-slate-400 group-hover:text-slate-200")} />
    <span className="text-[15px]">{label}</span>
  </button>
);

const StatCard = ({ title, value, subValue, icon: Icon, color }: { title: string, value: string, subValue: string, icon: any, color: string }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start mb-2">
      <span className="text-[13px] font-medium text-slate-600 uppercase tracking-wider">{title}</span>
      <Icon size={20} className={cn("opacity-20", color.replace('bg-', 'text-'))} />
    </div>
    <div>
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      <p className="text-xs text-slate-500 mt-1">{subValue}</p>
    </div>
  </div>
);

// --- Views ---

const DashboardView = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* AI Insight Banner */}
      <div className="bg-linear-to-br from-primary to-primary-dark p-6 rounded-xl text-white flex justify-between items-center shadow-lg">
        <div>
          <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
            <span>✨</span> AI بصیرت (AI Insight)
          </h3>
          <p className="text-sm opacity-90 max-w-2xl font-urdu">
            سردیوں کی آمد: وولن جرابوں کا اسٹاک کم ہے (Seasonal Forecast)۔ پچھلے ہفتے ان کی فروخت میں 40% اضافہ ہوا ہے۔
          </p>
        </div>
        <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          تفصیل دیکھیں
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Total Sales (آج)" 
          value="Rs. 45,200" 
          subValue="+12% from last month" 
          icon={TrendingUp} 
          color="bg-primary" 
        />
        <StatCard 
          title="Pending Recovery (بقایاجات)" 
          value="Rs. 185,000" 
          subValue="5 Retailers overdue" 
          icon={Receipt} 
          color="bg-rose-500" 
        />
        <StatCard 
          title="Total Retailers" 
          value="124" 
          subValue="3 new this month" 
          icon={Users} 
          color="bg-emerald-500" 
        />
        <StatCard 
          title="Stock Alerts" 
          value="08" 
          subValue="Requires urgent reorder" 
          icon={AlertTriangle} 
          color="bg-rose-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">فروخت کے رجحانات (Sales Trend)</h3>
            <span className="text-xs text-slate-600">گزشتہ 7 دن</span>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_SALES_DATA}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-[12px] text-slate-600 font-urdu">AI پیشن گوئی: اگلے ہفتے میں فروخت 15% بڑھنے کی امید ہے۔</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">بقایاجات (Top Debtors)</h3>
          </div>
          
          <div className="space-y-4">
            {MOCK_RETAILERS.slice(0, 4).map((retailer) => (
              <div key={retailer.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-sm font-bold text-slate-800">{retailer.name}</p>
                  <p className="text-[11px] text-slate-500">{retailer.owner}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-900">Rs. {retailer.balance.toLocaleString()}</span>
                  <button className="bg-[#25D366] text-white p-1.5 rounded hover:bg-[#128C7E] transition-colors">
                    <MessageCircle size={14} />
                  </button>
                </div>
              </div>
            ))}
            <div className="text-center pt-2">
              <button className="text-[12px] text-primary font-bold hover:underline">تمام ریکارڈ دیکھیں</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InventoryView = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredItems = MOCK_INVENTORY.filter(item => {
    const matchesFilter = filter === 'All' || item.category === filter;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-lg w-full md:w-96">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="تلاش کریں (Search)..." 
            className="bg-transparent border-none outline-none text-sm w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                filter === cat 
                  ? "bg-primary text-white shadow-md" 
                  : "bg-white text-slate-600 border border-slate-200 hover:border-primary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse custom-table">
            <thead>
              <tr className="bg-white border-b-2 border-slate-100">
                <th className="px-6 py-4 text-[12px] font-bold text-slate-600 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-4 text-[12px] font-bold text-slate-600 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-[12px] font-bold text-slate-600 uppercase tracking-wider">Colors/Sizes</th>
                <th className="px-6 py-4 text-[12px] font-bold text-slate-600 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-[12px] font-bold text-slate-600 uppercase tracking-wider">Price (Doz)</th>
                <th className="px-6 py-4 text-[12px] font-bold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[12px] font-bold text-slate-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800">{item.name}</div>
                    <div className="text-[11px] text-slate-400">ID: #HOS-{item.id.toString().padStart(3, '0')}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[11px] font-medium">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600">{item.colors.join(', ')}</div>
                    <div className="text-[11px] text-slate-400">{item.sizes.join(', ')}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-mono font-bold text-slate-700">{item.stock}</div>
                    <div className="text-[10px] text-slate-400 uppercase">Dozens</div>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-800">
                    Rs. {item.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "badge",
                      item.status === 'Low' ? "badge-danger" : "badge-success"
                    )}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors">
                      <Plus size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const LedgerView = () => {
  const [selectedRetailer, setSelectedRetailer] = useState<any>(null);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-800">Retailer Ledgers (ادھار کھاتہ)</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all">
              <Plus size={18} /> Add New Retailer
            </button>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-bottom border-slate-100">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Retailer Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Outstanding Balance</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Payment</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {MOCK_RETAILERS.map((retailer) => (
                    <tr key={retailer.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800">{retailer.name}</div>
                        <div className="text-xs text-slate-400">{retailer.owner}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{retailer.location}</td>
                      <td className="px-6 py-4">
                        <div className={cn(
                          "font-bold",
                          retailer.balance > 50000 ? "text-rose-600" : retailer.balance > 0 ? "text-amber-600" : "text-emerald-600"
                        )}>
                          Rs. {retailer.balance.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{retailer.lastPayment}</td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => setSelectedRetailer(retailer)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-colors"
                        >
                          <MessageCircle size={14} /> WhatsApp
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Recovery Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <span className="text-sm text-slate-500">Total Outstanding</span>
                <span className="font-bold text-slate-800">Rs. 178,500</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-rose-50 rounded-xl">
                <span className="text-sm text-rose-600">Overdue ({">"}30 Days)</span>
                <span className="font-bold text-rose-600">Rs. 89,000</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-xl">
                <span className="text-sm text-emerald-600">Collected Today</span>
                <span className="font-bold text-emerald-600">Rs. 12,400</span>
              </div>
            </div>
            <button className="w-full mt-6 py-3 border-2 border-dashed border-slate-200 text-slate-400 rounded-xl text-sm font-bold hover:border-indigo-300 hover:text-indigo-600 transition-all">
              Download Recovery List (PDF)
            </button>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-6 rounded-2xl text-white shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Info size={18} className="text-indigo-200" />
              <h4 className="font-bold">Pro Tip</h4>
            </div>
            <p className="text-sm text-indigo-100 leading-relaxed">
              Retailers with balances over 50k are highlighted in red. Sending weekly reminders increases recovery rates by 25%.
            </p>
          </div>
        </div>
      </div>

      {/* WhatsApp Modal */}
      <AnimatePresence>
        {selectedRetailer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRetailer(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800">WhatsApp Reminder</h3>
                <button onClick={() => setSelectedRetailer(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-2">Message Preview (Urdu)</p>
                  <p className="text-lg font-medium text-slate-800 leading-relaxed text-right">
                    السلام علیکم <span className="text-indigo-600 font-bold">{selectedRetailer.name}</span>، آپ کا پچھلا بل <span className="text-rose-600 font-bold">Rs. {selectedRetailer.balance.toLocaleString()}</span> روپے بقایا ہے۔ براہ کرم جلد ادائیگی فرمائیں۔ شکریہ!
                  </p>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <Users size={20} className="text-slate-400" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{selectedRetailer.owner}</p>
                    <p>{selectedRetailer.location}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-slate-50 flex gap-3">
                <button 
                  onClick={() => setSelectedRetailer(null)}
                  className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    alert('Reminder sent to ' + selectedRetailer.name);
                    setSelectedRetailer(null);
                  }}
                  className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} /> Send Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BillingView = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [discount, setDiscount] = useState(0);
  const [selectedRetailer, setSelectedRetailer] = useState('');

  const addToCart = (product: any) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQty = (id: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const total = subtotal - discount;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Select Items (آئٹمز منتخب کریں)</h3>
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
            <Search size={16} className="text-slate-400" />
            <input type="text" placeholder="Quick search..." className="text-sm outline-none w-32" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MOCK_INVENTORY.map(product => (
            <button
              key={product.id}
              onClick={() => addToCart(product)}
              className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all text-left group"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-wider">
                  {product.category}
                </span>
                <Plus size={18} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
              </div>
              <h4 className="font-bold text-slate-800 mb-1">{product.name}</h4>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Rs. {product.price}/Doz</span>
                <span className={cn(
                  "text-[10px] font-bold px-1.5 py-0.5 rounded",
                  product.stock < 20 ? "bg-rose-50 text-rose-600" : "bg-slate-50 text-slate-400"
                )}>
                  Stock: {product.stock}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden flex flex-col h-[calc(100vh-12rem)] sticky top-6">
          <div className="p-6 bg-slate-50 border-b border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCart size={20} className="text-indigo-600" />
              <h3 className="font-bold text-slate-800">Current Order</h3>
            </div>
            <select 
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              value={selectedRetailer}
              onChange={(e) => setSelectedRetailer(e.target.value)}
            >
              <option value="">Select Retailer (دکاندار منتخب کریں)</option>
              {MOCK_RETAILERS.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
            </select>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
                <ShoppingCart size={48} strokeWidth={1} />
                <p className="text-sm">No items in cart</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex gap-3 animate-in fade-in slide-in-from-right-2">
                  <div className="flex-1">
                    <h5 className="text-sm font-bold text-slate-800">{item.name}</h5>
                    <p className="text-xs text-slate-500">Rs. {item.price} x {item.qty}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateQty(item.id, -1)}
                      className="w-6 h-6 flex items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50"
                    >
                      -
                    </button>
                    <span className="text-sm font-mono font-bold w-6 text-center">{item.qty}</span>
                    <button 
                      onClick={() => updateQty(item.id, 1)}
                      className="w-6 h-6 flex items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50"
                    >
                      +
                    </button>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="ml-2 text-slate-300 hover:text-rose-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-bold text-slate-800">Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Bulk Discount</span>
              <input 
                type="number" 
                className="w-20 p-1 text-right border border-slate-200 rounded-md outline-none text-sm font-bold text-rose-600"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
              />
            </div>
            <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
              <span className="font-bold text-slate-800">Total Bill</span>
              <span className="text-xl font-black text-indigo-600">Rs. {total.toLocaleString()}</span>
            </div>
            <button 
              disabled={cart.length === 0 || !selectedRetailer}
              className="w-full mt-4 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center gap-2"
              onClick={() => alert('Order Placed Successfully!')}
            >
              <CheckCircle2 size={20} /> Complete Order (بل بنائیں)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Responsive sidebar handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard': return <DashboardView />;
      case 'Inventory': return <InventoryView />;
      case 'Ledger': return <LedgerView />;
      case 'Billing': return <BillingView />;
      default: return <DashboardView />;
    }
  };

  const getUrduTitle = (tab: string) => {
    switch (tab) {
      case 'Dashboard': return 'ڈیش بورڈ';
      case 'Inventory': return 'اسٹاک مینجمنٹ';
      case 'Ledger': return 'ادھار کھاتہ';
      case 'Billing': return 'بلنگ اور آرڈر';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="fixed inset-y-0 left-0 w-[240px] bg-slate-900 text-white z-40 lg:relative flex flex-col"
          >
            <div className="p-6 border-b border-slate-800 mb-6">
              <h1 className="font-bold text-xl text-primary font-urdu">ہوزری AI سسٹم</h1>
            </div>

            <nav className="flex-1 space-y-0">
              <SidebarItem 
                icon={LayoutDashboard} 
                label="📊 ڈیش بورڈ (Dashboard)" 
                active={activeTab === 'Dashboard'} 
                onClick={() => setActiveTab('Dashboard')} 
              />
              <SidebarItem 
                icon={Package} 
                label="📦 اسٹاک (Inventory)" 
                active={activeTab === 'Inventory'} 
                onClick={() => setActiveTab('Inventory')} 
              />
              <SidebarItem 
                icon={Users} 
                label="📒 ادھار کھاتہ (Ledger)" 
                active={activeTab === 'Ledger'} 
                onClick={() => setActiveTab('Ledger')} 
              />
              <SidebarItem 
                icon={Receipt} 
                label="🛒 نیا بل (New Bill)" 
                active={activeTab === 'Billing'} 
                onClick={() => setActiveTab('Billing')} 
              />
              <SidebarItem 
                icon={Users} 
                label="👥 ریٹیلرز (Retailers)" 
                active={false} 
                onClick={() => {}} 
              />
              <SidebarItem 
                icon={TrendingUp} 
                label="📈 رپورٹ (Reports)" 
                active={false} 
                onClick={() => {}} 
              />
              <SidebarItem 
                icon={Settings} 
                label="⚙️ سیٹنگز (Settings)" 
                active={false} 
                onClick={() => {}} 
              />
            </nav>

            <div className="p-6 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
                  FK
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">Farman Khaksar</p>
                  <p className="text-[10px] text-slate-400 truncate">احمد ایڈمن</p>
                </div>
                <button className="text-slate-400 hover:text-rose-500 transition-colors">
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-50 rounded-lg text-slate-500 lg:hidden"
            >
              <Menu size={24} />
            </button>
            <div className="relative">
              <input 
                type="text" 
                placeholder="تلاش کریں (Search)..." 
                className="bg-slate-100 border-none px-4 py-2 rounded-lg text-sm w-[300px] outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <span>مرحبا، احمد ایڈمن</span>
              <div className="w-8 h-8 bg-primary rounded-full"></div>
            </div>
            <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>

      {/* Mobile Overlay */}
      {isSidebarOpen && window.innerWidth < 1024 && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
