import { useState } from "react";
import { AlertCircle, CheckCircle, Zap } from "lucide-react";
import type { MigrationProgress, MigrationResult } from "@/admin/utils/migrate";
import { migrateAllData, getMigrationStats } from "@/admin/utils/migrate";

export function MigrationPage() {
  const [migrating, setMigrating] = useState(false);
  const [progress, setProgress] = useState<MigrationProgress | null>(null);
  const [results, setResults] = useState<MigrationResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const stats = getMigrationStats();

  const handleMigrate = async () => {
    setMigrating(true);
    setError(null);
    setResults([]);
    setProgress(null);

    try {
      const migrationResults = await migrateAllData((prog) => {
        setProgress(prog);
      });
      setResults(migrationResults);
    } catch (err: any) {
      setError(err.message || "Migration failed");
    } finally {
      setMigrating(false);
    }
  };

  const totalSuccess = results.reduce((sum, r) => sum + r.success, 0);
  const totalFailed = results.reduce((sum, r) => sum + r.failed, 0);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-1" style={{ color: "var(--t-text)" }}>
        Data Migration
      </h1>
      <p className="text-sm mb-6" style={{ color: "var(--t-muted)" }}>
        Migrate your static portfolio data to Firebase Firestore
      </p>

      {/* Overview Card */}
      <div className="rounded-xl p-5 mb-6" style={{ background: "var(--t-surface)", border: `1px solid var(--t-border)` }}>
        <h3 className="font-display font-bold mb-3" style={{ color: "var(--t-text)" }}>
          Data to Migrate
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          <div>
            <p style={{ color: "var(--t-muted)" }}>Profile</p>
            <p className="font-bold text-lg" style={{ color: "var(--t-accent)" }}>{stats.profile}</p>
          </div>
          <div>
            <p style={{ color: "var(--t-muted)" }}>Projects</p>
            <p className="font-bold text-lg" style={{ color: "var(--t-accent)" }}>{stats.projects}</p>
          </div>
          <div>
            <p style={{ color: "var(--t-muted)" }}>Experience</p>
            <p className="font-bold text-lg" style={{ color: "var(--t-accent)" }}>{stats.experience}</p>
          </div>
          <div>
            <p style={{ color: "var(--t-muted)" }}>Services</p>
            <p className="font-bold text-lg" style={{ color: "var(--t-accent)" }}>{stats.services}</p>
          </div>
          <div>
            <p style={{ color: "var(--t-muted)" }}>Skills</p>
            <p className="font-bold text-lg" style={{ color: "var(--t-accent)" }}>{stats.skills}</p>
          </div>
          <div>
            <p style={{ color: "var(--t-muted)" }}>Certificates</p>
            <p className="font-bold text-lg" style={{ color: "var(--t-accent)" }}>{stats.certificates}</p>
          </div>
          <div>
            <p style={{ color: "var(--t-muted)" }}>Freelance</p>
            <p className="font-bold text-lg" style={{ color: "var(--t-accent)" }}>{stats.freelance}</p>
          </div>
          <div>
            <p style={{ color: "var(--t-muted)" }}>Achievements</p>
            <p className="font-bold text-lg" style={{ color: "var(--t-accent)" }}>{stats.achievements}</p>
          </div>
        </div>
        <p className="font-display font-bold text-lg mt-4" style={{ color: "var(--t-text)" }}>
          Total: {stats.total} items
        </p>
      </div>

      {/* Warning */}
      <div className="rounded-xl p-4 mb-6 flex items-start gap-3"
        style={{ background: "#f59e0b15", border: "1px solid #f59e0b30" }}>
        <AlertCircle size={18} className="shrink-0 mt-0.5" style={{ color: "#f59e0b" }} />
        <div>
          <p className="text-sm font-medium" style={{ color: "#f59e0b" }}>Before you migrate:</p>
          <p className="text-xs mt-1" style={{ color: "var(--t-muted)" }}>
            Make sure Firebase is configured (.env.local) and Firestore is initialized. This will create/overwrite documents with your data.
          </p>
        </div>
      </div>

      {/* Progress */}
      {progress && migrating && (
        <div className="rounded-xl p-5 mb-6" style={{ background: "var(--t-surface)", border: `1px solid var(--t-border)` }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 rounded-full animate-spin" style={{ borderTop: `2px solid var(--t-accent)`, borderRight: "2px solid transparent" }} />
            <span className="text-sm font-medium" style={{ color: "var(--t-text)" }}>
              {progress.collection}
            </span>
          </div>
          <p className="text-xs mb-2" style={{ color: "var(--t-muted)" }}>
            {progress.message}
          </p>
          <div className="w-full bg-gray-700/30 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${(progress.current / progress.total) * 100}%`,
                background: "var(--t-accent)"
              }}
            />
          </div>
          <p className="text-xs mt-2 text-right" style={{ color: "var(--t-muted)" }}>
            {progress.current}/{progress.total}
          </p>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="rounded-xl p-5 mb-6" style={{ background: "var(--t-surface)", border: `1px solid var(--t-border)` }}>
          <h3 className="font-display font-bold mb-4" style={{ color: "var(--t-text)" }}>
            Migration Results
          </h3>
          <div className="space-y-2">
            {results.map((result) => (
              <div key={result.collection} className="flex items-center justify-between p-3 rounded-lg"
                style={{ background: "var(--t-bg)" }}>
                <div className="flex items-center gap-2">
                  {result.failed === 0 ? (
                    <CheckCircle size={16} style={{ color: "#10b981" }} />
                  ) : (
                    <AlertCircle size={16} style={{ color: "#f59e0b" }} />
                  )}
                  <span className="font-medium text-sm" style={{ color: "var(--t-text)" }}>
                    {result.collection}
                  </span>
                </div>
                <span className="text-xs" style={{ color: "var(--t-muted)" }}>
                  {result.success} ✓ {result.failed > 0 && `${result.failed} ✗`}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-lg" style={{ background: "#10b98115" }}>
            <p className="text-sm font-medium" style={{ color: "#10b981" }}>
              ✓ {totalSuccess} items migrated successfully
            </p>
            {totalFailed > 0 && (
              <p className="text-sm" style={{ color: "#f59e0b" }}>
                ✗ {totalFailed} items failed
              </p>
            )}
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-xl p-4 mb-6 flex items-start gap-3"
          style={{ background: "#f873155", border: "1px solid #f873155" }}>
          <AlertCircle size={18} className="shrink-0 mt-0.5" style={{ color: "#f87171" }} />
          <div>
            <p className="text-sm font-medium" style={{ color: "#f87171" }}>Migration Error</p>
            <p className="text-xs mt-1 font-mono" style={{ color: "var(--t-muted)" }}>
              {error}
            </p>
          </div>
        </div>
      )}

      {/* Button */}
      <button
        onClick={handleMigrate}
        disabled={migrating}
        className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium transition-all disabled:opacity-40 w-full sm:w-auto"
        style={{ background: "var(--t-accent)", color: "var(--t-bg)" }}>
        <Zap size={16} />
        {migrating ? "Migrating..." : results.length > 0 ? "Migrate Again" : "Start Migration"}
      </button>
    </div>
  );
}
