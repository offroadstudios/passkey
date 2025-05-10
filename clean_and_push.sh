# 1. Back up your current work
git checkout main
git branch backup-main

# 2. Use built-in filter-branch to drop node_modules/
git filter-branch --force \
  --index-filter 'git rm -r --cached --ignore-unmatch node_modules' \
  --prune-empty \
  --tag-name-filter cat \
  -- --all

# 3. Clean up dangling refs and garbage-collect
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 4. Force-push the cleaned history
git push origin --force --all
git push origin --force --tags
