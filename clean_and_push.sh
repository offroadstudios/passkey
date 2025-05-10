#!/usr/bin/env bash
set -euo pipefail

LOGFILE="git_push.log"
exec > >(tee -a "$LOGFILE") 2>&1

echo "=== Script start: $(date) ==="

# 1) Ensure .gitignore exists
if [[ ! -f .gitignore ]]; then
  echo "ERROR: .gitignore not found in $(pwd)" >&2
  exit 1
fi

# 2) Add node_modules/ to .gitignore if missing
if ! grep -Fxq "node_modules/" .gitignore; then
  echo "Adding node_modules/ to .gitignore"
  echo "" >> .gitignore
  echo "# dependencies" >> .gitignore
  echo "node_modules/" >> .gitignore
  git add .gitignore
  git commit -m "chore: add node_modules/ to .gitignore"
fi

# 3) Remove any tracked node_modules/
echo "Removing tracked node_modules/ from Git index"
git rm -r --cached node_modules || echo "Nothing to remove, continuing..."

# 4) (Optional) Setup Git LFS for SWC binaries if Git LFS is available
if command -v git-lfs &>/dev/null; then
  echo "Configuring Git LFS for Next.js SWC binaries"
  git lfs install --skip-repo || true
  git lfs track "node_modules/@next/swc-linux-*-*/next-swc.*.node"
  git add .gitattributes
  git commit -m "chore: track SWC binaries with Git LFS"
else
  echo "Git LFS not installed; skipping LFS setup"
fi

# 5) Commit removal of node_modules/
git commit -m "chore: remove node_modules/ from repo" || echo "No changes to commit"

# 6) Push to origin main
echo "Pushing to origin main…"
if git push -u origin main; then
  echo "Push succeeded"
else
  echo "Push failed; see above for errors" >&2
  exit 1
fi

echo "=== Script end: $(date) ==="
