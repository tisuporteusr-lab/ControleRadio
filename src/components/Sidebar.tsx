import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Radio, 
  Wrench, 
  Building2, 
  BarChart3, 
  Users, 
  ChevronRight,
  Server,
  FileText,
  Download
} from 'lucide-react';
import { generateManualInstalacaoPDF } from '../services/manualPdf';

export type ActiveTab = 'dashboard' | 'radios' | 'manutencoes' | 'setores' | 'relatorios' | 'usuarios';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  activeMaintenancesCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  activeMaintenancesCount,
}) => {
  const { isAdmin } = useAuth();

  const navItems = [
    {
      id: 'dashboard' as ActiveTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Visão geral e indicadores',
    },
    {
      id: 'radios' as ActiveTab,
      label: 'Rádios',
      icon: Radio,
      description: 'Inventário e status',
    },
    {
      id: 'manutencoes' as ActiveTab,
      label: 'Manutenções',
      icon: Wrench,
      description: 'Envios, retornos e prazos',
      badge: activeMaintenancesCount > 0 ? activeMaintenancesCount : null,
      badgeColor: 'bg-amber-500 text-slate-950 font-bold',
    },
    {
      id: 'setores' as ActiveTab,
      label: 'Setores',
      icon: Building2,
      description: 'Locais de operação',
    },
    {
      id: 'relatorios' as ActiveTab,
      label: 'Relatórios',
      icon: BarChart3,
      description: 'Análises, PDF e CSV',
    },
    {
      id: 'usuarios' as ActiveTab,
      label: 'Usuários',
      icon: Users,
      description: 'Acessos e senhas',
      adminOnly: true,
    },
  ];

  const handleItemClick = (id: ActiveTab) => {
    onSelectTab(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-stone-900/60 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-[#FAF7F0] border-r border-[#E5DEC9] transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between overflow-y-auto`}
      >
        <div className="p-4 space-y-1.5">
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-stone-400">
            Navegação do Sistema
          </div>

          {navItems.map((item) => {
            if (item.adminOnly && !isAdmin) return null;

            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                  isActive
                    ? 'bg-amber-100/80 text-amber-950 border border-amber-300 shadow-xs'
                    : 'text-stone-700 hover:bg-stone-100 hover:text-stone-950 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-amber-600 text-white'
                        : 'bg-stone-200/70 text-stone-600 group-hover:bg-stone-300/70 group-hover:text-stone-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-left">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge !== null && item.badge !== undefined && (
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-4 h-4 text-amber-700" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Hardware Info Box & Manual */}
        <div className="p-4 m-3 bg-stone-900 rounded-2xl text-white space-y-2.5 border border-stone-800">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-stone-200">Parque de Rádios</span>
          </div>
          <div className="text-[11px] text-stone-300 space-y-0.5 leading-tight">
            <p><strong>Fornecedor:</strong> Mendonça</p>
            <p><strong>Modelo:</strong> Motorola DP450</p>
            <p><strong>Contrato:</strong> Locação Ativa</p>
          </div>
          <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
            <button
              onClick={generateManualInstalacaoPDF}
              className="w-full py-1.5 px-2 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
              title="Baixar Manual de Instalação em PDF"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Manual de Instalação (PDF)</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
