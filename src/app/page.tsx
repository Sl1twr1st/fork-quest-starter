"use client";

export default function ForkQuestHomepage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #dbeafe 0%, #fdf4ff 50%, #fed7aa 100%)',
      padding: '48px 24px'
    }}>
      <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{
            fontSize: '64px',
            fontWeight: 'bold',
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 50%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🍴 ParAIkitri< br/>Fork Quest Collection< br/>
            (......) Sebagai Percakapan
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#6b7280',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Bertanya Ulang,< br/>Berfikir Ulang,< br/>Kontemplasi Ulang.< br/>-----< br/>Interactive journeys yang ngajak orang &ldquo;menyadari ulang&rdquo; tentang diri mereka dan dunia melalui pertanyaan-pertanyaan yang progressively deeper.
          </p>
        </div>

        {/* Quest Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
          marginBottom: '64px',
          maxWidth: '900px',
          margin: '0 auto 64px auto'
        }}>

          {/* Rebahan Quest */}
          <div 
            style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
              borderRadius: '16px',
              padding: '28px',
              border: '2px solid #f59e0b',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            onClick={() => window.location.href = '/rebahan-quest'}
          >
            <div style={{ fontSize: '44px', marginBottom: '14px' }}>😴🛏️</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#92400e',
              marginBottom: '14px'
            }}>
              Rebahan Sebagai Percakapan
            </h3>
            <p style={{
              color: '#374151',
              marginBottom: '20px',
              lineHeight: '1.6',
              fontSize: '15px'
            }}>
              Ngobrol santai tapi bisa nyadar pelan-pelan. 5 pertanyaan simpel yang bikin lo refleksi sambil rebahan. 
              Versi yang lebih approachable dari quest lainnya.
            </p>
            <div style={{
              background: '#92400e',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              textAlign: 'center',
              fontWeight: '600',
              fontSize: '14px'
            }}>
              Start Rebahan Quest →
            </div>
          </div>
          
          {/* Galau Fork Quest */}
          <div 
            style={{
              background: 'linear-gradient(135deg, #f3e8ff 0%, #fce7f3 100%)',
              borderRadius: '16px',
              padding: '28px',
              border: '2px solid #a855f7',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            onClick={() => window.location.href = '/galau-quest'}
          >
            <div style={{ fontSize: '44px', marginBottom: '14px' }}>😵‍💫</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#7c3aed',
              marginBottom: '14px'
            }}>
              Galau Sebagai Percakapan
            </h3>
            <p style={{
              color: '#374151',
              marginBottom: '20px',
              lineHeight: '1.6',
              fontSize: '15px'
            }}>
              Journey 5 levels deep dari keluhan sehari-hari sampai final boss consciousness. 
              Bikin orang sadar versi diri mereka yang lain.
            </p>
            <div style={{
              background: '#7c3aed',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              textAlign: 'center',
              fontWeight: '600',
              fontSize: '14px'
            }}>
              Start Galau Quest →
            </div>
          </div>

          {/* Indonesia Sebagai Percakapan Quest */}
          <div 
            style={{
              background: 'linear-gradient(135deg, #dbeafe 0%, #fecaca 100%)',
              borderRadius: '16px',
              padding: '28px',
              border: '2px solid #3b82f6',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            onClick={() => window.location.href = '/indonesia-quest'}
          >
            <div style={{ fontSize: '44px', marginBottom: '14px' }}>🇮🇩</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#2563eb',
              marginBottom: '14px'
            }}>
              Indonesia Sebagai Percakapan
            </h3>
            <p style={{
              color: '#374151',
              marginBottom: '20px',
              lineHeight: '1.6',
              fontSize: '15px'
            }}>
              Journey dari pertanyaan surface tentang Indonesia sampai final boss consciousness kebangsaan.
              Dari &ldquo;Apakah lo masih cinta bangsa ini?&rdquo; sampai &ldquo;Siapa Indonesia tanpa cerita heroik?&rdquo;
            </p>
            <div style={{
              background: '#2563eb',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              textAlign: 'center',
              fontWeight: '600',
              fontSize: '14px'
            }}>
              Start Indonesia Quest →
            </div>
          </div>

          {/* Berkshire Quest */}
          <div 
            style={{
              background: 'linear-gradient(135deg, #d1fae5 0%, #fef3c7 100%)',
              borderRadius: '16px',
              padding: '28px',
              border: '2px solid #10b981',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            onClick={() => window.location.href = '/berkshire-quest'}
          >
            <div style={{ fontSize: '44px', marginBottom: '14px' }}>🏗️</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#059669',
              marginBottom: '14px'
            }}>
              Investasi Sebagai Percakapan
            </h3>
            <p style={{
              color: '#374151',
              marginBottom: '20px',
              lineHeight: '1.6',
              fontSize: '15px'
            }}>
              Interaktif yang ngajak investor menyadari ulang makna nilai, akumulasi, dan warisan kapitalisme.
              Dari &ldquo;Kenapa harga naik = lo makin pintar?&rdquo; sampai &ldquo;Siapa lo tanpa portfolio?&rdquo;
            </p>
            <div style={{
              background: '#059669',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              textAlign: 'center',
              fontWeight: '600',
              fontSize: '14px'
            }}>
              Start Berkshire Quest →
            </div>
          </div>

          {/* Literasi Quest */}
          <div 
            style={{
              background: 'linear-gradient(135deg, #fed7aa 0%, #fecaca 100%)',
              borderRadius: '16px',
              padding: '28px',
              border: '2px solid #ea580c',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            onClick={() => window.location.href = '/literasi-quest'}
          >
            <div style={{ fontSize: '44px', marginBottom: '14px' }}>📚</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#7c2d12',
              marginBottom: '14px'
            }}>
              Literasi Sebagai Percakapan
            </h3>
            <p style={{
              color: '#374151',
              marginBottom: '20px',
              lineHeight: '1.6',
              fontSize: '15px'
            }}>
              Journey dari surface reading sampai beyond the page consciousness.
              Dari &ldquo;Kenapa lo percaya orang yang baca banyak buku itu otomatis pintar?&rdquo; sampai &ldquo;Siapa lo tanpa rak buku lo?&rdquo;
            </p>
            <div style={{
              background: '#7c2d12',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              textAlign: 'center',
              fontWeight: '600',
              fontSize: '14px'
            }}>
              Start Literasi Quest →
            </div>
          </div>
        </div>

        
        

        {/* Features */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '64px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '12px',
            padding: '24px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🌀</div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Fork Logic</h4>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              Setiap pertanyaan bisa di-fork jadi multiple kemungkinan awareness
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '12px',
            padding: '24px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📱</div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Viral Ready</h4>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              Built-in sharing mechanism untuk social media virality
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '12px',
            padding: '24px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎯</div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>5 Levels Deep</h4>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              Progressive deepening dari surface sampai final boss consciousness
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          borderRadius: '16px',
          padding: '32px',
          textAlign: 'center',
          color: 'white'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#cbd5e1',
            marginBottom: '20px'
          }}>
            Metode fork pertanyaan ini digunakan Swarm Par<span style={{ fontWeight: 'bold', color: '#60a5fa' }}>AI</span>kitri untuk< br/>
            membangun <span style={{ fontWeight: 'bold', color: '#fbbf24' }}>ParAIkitri V.001, V.0015, V.002 & BETA TEST v.01</span>.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '16px'
          }}>
            <button
              onClick={() => window.open('https://indonesiasebagaipercakapan.katabaru.com/fork-sebagai-konsep/', '_blank')}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                color: '#1f2937',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              🍴 Konsep Fork
            </button>
            
            <button
              onClick={() => window.open('https://indonesiasebagaipercakapan.katabaru.com/pertanyaan/', '_blank')}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              🎯 Buat Pertanyaan Baru
            </button>

            <button
              onClick={() => window.open('https://indonesiasebagaipercakapan.katabaru.com/konsep-swarm/', '_blank')}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                color: '#1f2937',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              🐝 Konsep Swarm
            </button>
          </div>
          
          <p style={{
            fontSize: '12px',
            color: '#34a3b8',
            margin: '0'
          }}>
            &ldquo;Satu menjadi banyak, untuk selalu mengingat satu&rdquo; 🌀
          </p>
        </div>
      </div>
    </div>
  );
}