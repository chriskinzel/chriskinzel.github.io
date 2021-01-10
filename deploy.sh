#!/bin/sh

trap "exit 1" TERM EXIT

branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')
target='prod'

git stash store "$(git stash create)" > /dev/null 2>&1
doPop=$?

function cleanup() {
  git checkout "$branch" > /dev/null 2>&1
  git branch -D "$target" > /dev/null 2>&1

  if [ $doPop -eq 0 ]
  then
    git stash pop > /dev/null 2>&1
  fi
}

trap cleanup TERM EXIT

(git branch -D "$target"; git checkout -b "$target") > /dev/null 2>&1 && echo 'Building...' && npx ng build --prod && (git ls-tree -r "$target" --name-only | grep -vE '^\.git(ignore|lab-ci\.yml)' | xargs rm || true) && mv ./dist/personal-website/* ./ && echo 'Pushing files...' && git add . && git commit -m 'Deploying' > /dev/null 2>&1 && git push -f origin "$target" && echo '\nDeployment complete!'

cleanup
