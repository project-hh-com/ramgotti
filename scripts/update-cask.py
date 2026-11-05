#!/usr/bin/env python3
import sys

def main():
    if len(sys.argv) < 5:
        print("Usage: update-cask.py <cask_path> <version> <arm_sha> <x64_sha>")
        sys.exit(1)

    cask_path = sys.argv[1]
    version = sys.argv[2]
    arm_sha = sys.argv[3]
    x64_sha = sys.argv[4]

    content = f'''cask "ramgotti" do
  version "{version}"

  on_arm do
    sha256 "{arm_sha}"
    url "https://github.com/project-hh-com/ramgotti/releases/download/v#{{version}}/RAMgotti-arm64.dmg"
  end
  on_intel do
    sha256 "{x64_sha}"
    url "https://github.com/project-hh-com/ramgotti/releases/download/v#{{version}}/RAMgotti-x64.dmg"
  end

  name "램고치"
  name "RAMgotti"
  desc "Ultra-lightweight macOS desktop pet that cleans memory leaks"
  homepage "https://github.com/project-hh-com/ramgotti"

  depends_on macos: ">= :monterey"

  app "RAMgotti.app"

  postflight do
    system_command "/usr/bin/xattr",
                   args: ["-dr", "com.apple.quarantine", "#{{appdir}}/RAMgotti.app"],
                   sudo: false
  end

  zap trash: [
    "~/Library/Application Support/com.projecthh.ramgotti",
    "~/Library/Preferences/com.projecthh.ramgotti.plist",
    "~/Library/Saved Application State/com.projecthh.ramgotti.savedState",
  ]
end
'''

    with open(cask_path, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"Updated {cask_path} to v{version}")

if __name__ == "__main__":
    main()
