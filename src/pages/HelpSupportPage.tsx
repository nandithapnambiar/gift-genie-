import React from 'react';
import { Mail, MessageCircle, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAppStore } from '../store';

export const HelpSupportPage: React.FC = () => {
  const { setCurrentPage } = useAppStore();

  const supportItems = [
    {
      icon: MessageCircle,
      title: 'Live chat',
      description: 'Talk with the Gift Genie team and get quick help for your gift search.',
    },
    {
      icon: Mail,
      title: 'Email us',
      description: 'hello@giftgenie.app',
    },
    {
      icon: ShieldCheck,
      title: 'Safety & policies',
      description: 'Our recommendations are designed to be thoughtful, respectful, and easy to use.',
    },
  ];

  return (
    <main className="md:ml-64 pb-20 md:pb-0">
      <div className="page-container max-w-2xl py-8">
        <button
          type="button"
          onClick={() => setCurrentPage('home')}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-mauve/75 hover:text-mauve"
        >
          <ArrowLeft size={18} />
          Back home
        </button>

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-mauve/60">Support</p>
          <h1 className="heading-2 mt-2">Help & Support</h1>
        </div>

        <div className="space-y-4">
          {supportItems.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-2xl bg-white p-5 shadow-soft">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-xl bg-sage/60 p-2 text-mauve">
                  <Icon size={20} />
                </div>
                <h2 className="text-lg font-bold text-mauve">{title}</h2>
              </div>
              <p className="text-sm text-mauve/75">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
