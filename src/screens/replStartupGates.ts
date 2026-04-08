/**
 * Startup gates for the REPL.
 *
 * Prevents startup plugin checks and recommendation dialogs from stealing
 * focus while the user is typing or has early input buffered.
 *
 * This addresses the root cause of issue #363: on mount, performStartupChecks
 * triggers plugin loading, which populates trackedFiles, which triggers
 * useLspPluginRecommendation to surface an LSP recommendation dialog. Since
 * promptTypingSuppressionActive is false before the user has typed anything,
 * getFocusedInputDialog() returns the dialog, unmounting PromptInput entirely.
 */

const STARTUP_CHECK_DELAY_MS = 1500

export function shouldRunStartupChecks(
  isRemoteSession: boolean,
  hasStarted: boolean,
  promptTypingSuppressionActive: boolean,
): boolean {
  if (isRemoteSession) return false
  if (hasStarted) return false
  if (promptTypingSuppressionActive) return false
  return true
}

export { STARTUP_CHECK_DELAY_MS }