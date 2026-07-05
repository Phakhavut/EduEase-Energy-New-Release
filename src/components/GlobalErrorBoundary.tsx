import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  lang: 'th' | 'en';
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    lang: 'th',
  };

  public static getDerivedStateFromError(error: Error): State {
    // Detect language from localStorage
    const savedLang = typeof window !== 'undefined' ? (localStorage.getItem('lang') as 'th' | 'en') || 'th' : 'th';
    return { hasError: true, error, lang: savedLang };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error inside boundary:', error, errorInfo);
  }

  private handleQuickRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  private handleResetAndRetry = () => {
    // Clear all localStorage keys starting with 'eudease_'
    if (typeof window !== 'undefined') {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('eudease_') || key.includes('DarkMode') || key === 'lang')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => {
        // Keep lang preferred if possible, but reset state
        if (key !== 'lang') {
          localStorage.removeItem(key);
        }
      });
    }
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  private getActionableFeedback = (errorMessage: string) => {
    const msg = errorMessage.toLowerCase();
    const isTh = this.state.lang === 'th';

    if (msg.includes('null') || msg.includes('undefined') || msg.includes('reading') || msg.includes('properties')) {
      return {
        title: isTh ? 'โครงสร้างข้อมูลไม่ตรงกัน' : 'Interface State Misalignment',
        description: isTh 
          ? 'หน้าจอพยายามอ่านค่าข้อมูลที่ยังโหลดไม่สมบูรณ์ หรือรูปแบบข้อมูลในเบราว์เซอร์เก่าเกินไป การคืนค่าเริ่มต้นระบบจะแก้ไขปัญหานี้ทันที' 
          : 'A component attempted to read data that is either missing or misaligned with your browser\'s local storage.',
        action: isTh 
          ? 'แนะนำให้คลิกปุ่ม "รีเซ็ตข้อมูลระบบและลองใหม่" เพื่อล้างข้อมูลแคชที่ผิดเพี้ยน' 
          : 'We recommend clicking "Reset State & Retry" to restore a clean set of defaults.',
        icon: 'fa-cubes-stacked'
      };
    }

    if (msg.includes('fetch') || msg.includes('network') || msg.includes('failed') || msg.includes('cors') || msg.includes('api')) {
      return {
        title: isTh ? 'การเชื่อมต่อเครือข่ายขัดข้อง' : 'Network Connection Interrupted',
        description: isTh 
          ? 'ระบบไม่สามารถส่งคำขอไปยังเซิร์ฟเวอร์ฐานข้อมูลหรือ AI อัจฉริยะได้ชั่วคราว เนื่องจากสัญญาณอินเทอร์เน็ตหลุดหรือขาดหาย' 
          : 'A secure backend request failed to complete. This is usually caused by a temporary connection drop or API rate limits.',
        action: isTh 
          ? 'กรุณาตรวจสอบสายสัญญาณหรือการเชื่อมต่ออินเทอร์เน็ต แล้วลองรีโหลดหน้านี้อีกครั้ง' 
          : 'Please check your internet connection or Wi-Fi status, then click "Quick Reload".',
        icon: 'fa-wifi'
      };
    }

    return {
      title: isTh ? 'ระบบความปลอดภัยจำกัดขอบเขตข้อผิดพลาด' : 'Runtime Anomaly Contained',
      description: isTh 
        ? 'เราตรวจพบพฤติกรรมการทำงานที่คาดไม่ถึงในหน้านี้ และได้แยกแยะความเสียหายเพื่อรักษาความมั่นคงของข้อมูลระบบโดยรวม' 
        : 'An unexpected runtime exception was isolated by our safety boundary to safeguard the remaining active modules.',
      action: isTh 
        ? 'ลองเริ่มระบบใหม่หรือรีเซ็ตค่ารูปแบบหน้าจอเพื่อกลับเข้าสู่แผงควบคุมพลังงานหลัก' 
        : 'A swift state refresh or page reload is highly likely to clear the temporary memory anomaly.',
      icon: 'fa-shield-halved'
    };
  };

  public render() {
    if (this.state.hasError) {
      const errorMessage = this.state.error?.message || 'Unknown exception';
      const feedback = this.getActionableFeedback(errorMessage);
      const isTh = this.state.lang === 'th';

      return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/95 z-[99999] p-4 text-white font-sans overflow-y-auto">
          <div className="w-full max-w-lg bg-slate-950 border border-rose-500/30 rounded-[2.5rem] p-6 md:p-10 text-center shadow-2xl relative overflow-hidden my-auto">
            {/* Ambient background light decoration */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-500/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              {/* Animated Warning Icon Container */}
              <div className="w-20 h-20 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-[1.75rem] flex items-center justify-center mx-auto mb-6 text-3xl animate-pulse">
                <i className={`fas ${feedback.icon}`}></i>
              </div>
              
              {/* Dynamic Bilingual Friendly Header */}
              <h2 className="text-xl md:text-2xl font-black font-display tracking-tight mb-3 uppercase text-rose-400">
                {feedback.title}
              </h2>
              
              <p className="text-xs md:text-sm text-slate-300 mb-6 leading-relaxed px-2">
                {feedback.description}
              </p>

              {/* Actionable Instruction Box */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 mb-6 text-left">
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 text-xs mt-0.5">⚡</span>
                  <div>
                    <h4 className="text-[0.75rem] font-bold text-slate-200 uppercase tracking-wider mb-1">
                      {isTh ? 'วิธีการแก้ไขปัญหา:' : 'RECOMMENDED SOLUTION:'}
                    </h4>
                    <p className="text-[0.75rem] text-slate-400 leading-relaxed">
                      {feedback.action}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tech Spec Log Expander */}
              <div className="bg-slate-900/90 border border-rose-950/40 rounded-2xl p-3.5 mb-8 text-left font-mono text-[0.7rem] text-rose-300 overflow-x-auto whitespace-pre-wrap max-h-28 scrollbar-thin">
                <span className="text-[0.65rem] text-slate-500 block mb-1 uppercase tracking-widest font-sans font-semibold">
                  {isTh ? 'รายละเอียดข้อผิดพลาด (สำหรับนักพัฒนา):' : 'TECHNICAL STACK TRACE:'}
                </span>
                {errorMessage}
              </div>
              
              {/* Action buttons stack */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={this.handleQuickRetry}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
                >
                  <i className="fas fa-redo text-[10px]"></i>
                  <span>{isTh ? 'ลองโหลดหน้าใหม่อีกครั้ง' : 'Quick Reload'}</span>
                </button>

                <button
                  onClick={this.handleResetAndRetry}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer border-0"
                >
                  <i className="fas fa-undo-alt text-[10px]"></i>
                  <span>{isTh ? 'รีเซ็ตข้อมูลและลองใหม่' : 'Reset State & Retry'}</span>
                </button>
              </div>

              {/* Language Switcher */}
              <button
                onClick={() => this.setState((prev) => ({ lang: prev.lang === 'th' ? 'en' : 'th' }))}
                className="mt-6 text-[0.65rem] text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest font-mono cursor-pointer border-0 bg-transparent p-1"
              >
                🌎 Toggle Language / สลับเป็นภาษา {this.state.lang === 'th' ? 'English' : 'ไทย'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

