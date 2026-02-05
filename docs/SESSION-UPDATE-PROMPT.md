# Session Update Prompt Template

## End-of-Session Command

Copy and paste this prompt at the end of each session:

---

**End session and create comprehensive documentation:**

1. **Create/update session notes** in `session-{today's date}.md` with:
   - Session overview (duration, primary tasks, achievements)
   - Detailed action log (commands run, files modified, installations)
   - Challenges encountered and solutions
   - New discoveries and learnings
   - Statistics (space freed, files created/deleted, tools installed)
   - Follow-up items (TODO list)

2. **Update CLAUDE.md** with:
   - Add today's session to Session History section
   - Update any changed tool versions
   - Add new commands to Common Commands section
   - Update TODO list
   - Add new discoveries to relevant sections

3. **Save conversation context**:
   - Export key learnings to memory
   - Update configuration notes if any settings changed
   - Document any new patterns or workflows discovered

4. **File locations**:
   - Save session notes to: `C:\Users\RichBlanchard\..PROJECTS\CLAUDE WINDOWS\`
   - Update: `C:\Users\RichBlanchard\..PROJECTS\CLAUDE WINDOWS\CLAUDE.md`
   - Also save to memory: `C:\Users\RichBlanchard\.claude\projects\...\memory\`

Please create comprehensive, detailed notes that I can reference in future sessions.

---

## Quick Version (Short Sessions)

For quick sessions with minimal changes:

---

**Quick session update:**

Create brief session notes for today documenting:
- What we worked on
- Files changed
- Commands used
- Any important discoveries

Update CLAUDE.md Session History section with one-line summary.

---

## Custom Session Notes Template

Use this when you want specific focus areas documented:

---

**End session - Focus on [SPECIFIC AREA]:**

Create session notes emphasizing:
- [Primary focus area, e.g., "Vercel deployment workflow"]
- [Secondary focus, e.g., "Hook configuration"]
- [Any specific learning, e.g., "Windows file permission patterns"]

Update CLAUDE.md sections:
- [Section name, e.g., "Vercel Operations"]
- [Section name, e.g., "Common Commands"]

---

## Monthly Summary Prompt

Use this at the end of each month:

---

**Create monthly summary for [MONTH YEAR]:**

Review all session notes from this month and create:

1. **Monthly summary document** (`summary-{MONTH}-{YEAR}.md`):
   - Total sessions this month
   - Major accomplishments
   - Tools/skills learned
   - Projects worked on
   - Total space freed / system improvements
   - Common issues and solutions discovered

2. **Update CLAUDE.md**:
   - Consolidate Session History (keep last 3 months detailed)
   - Archive older sessions to `sessions-archive.md`
   - Update TODO priorities based on month's learnings

---

## What Gets Saved

### Session Notes File (`session-YYYY-MM-DD.md`)
```markdown
# Session Notes - [Date]

## Session Overview
- Duration: [time]
- Primary Tasks: [list]
- Key Achievements: [bullets]

## Part 1: [Topic]
### Actions Taken
- [Detailed log]

### Commands Used
```bash
[commands]
```

### Challenges Encountered
- **Issue**: [description]
- **Solution**: [how resolved]

## Part 2: [Next Topic]
[...]

## Statistics
- Space freed: X GB
- Files deleted: X
- Tools installed: X
- Extensions added: X

## Discoveries
1. [New learning]
2. [Pattern identified]

## Follow-up Items
- [ ] Item 1
- [ ] Item 2

## Key Takeaways
1. [Important lesson]
2. [Workflow improvement]
```

### CLAUDE.md Updates
- Session History (new entry)
- Common Commands (if new commands used)
- Configuration (if settings changed)
- Important Notes (if new patterns discovered)
- TODO (updated with new items)

### Memory Files (Auto-saved to .claude)
- MEMORY.md (persistent across all projects)
- session notes copy (for Claude Code's reference)

## Automation Script

Want to make this even easier? Create a Windows shortcut:

```batch
@echo off
echo.
echo ╔══════════════════════════════════════════╗
echo ║   Claude Session Update Reminder         ║
echo ╚══════════════════════════════════════════╝
echo.
echo Copy this to Claude Code:
echo.
echo "End session and create comprehensive documentation"
echo.
echo Press any key to copy to clipboard...
pause > nul
echo End session and create comprehensive documentation | clip
echo.
echo ✓ Copied to clipboard! Paste into Claude Code.
echo.
pause
```

Save as: `update-session.bat`

## Usage Examples

### Example 1: After System Cleanup
```
End session and create comprehensive documentation:

Focus areas:
- System cleanup (4.2 GB freed)
- Deleted folders and rationale
- Windows permission issues encountered
- Safe deletion patterns learned

Update CLAUDE.md with new cleanup commands and folder categorizations.
```

### Example 2: After Tool Installation
```
End session - Tool installation focus:

Document:
- All tools installed with versions
- Configuration steps taken
- Integration points discovered
- Commands reference

Update CLAUDE.md Common Commands with all new CLI tools.
```

### Example 3: After Troubleshooting
```
End session - Troubleshooting emphasis:

Create detailed notes on:
- Problem: [describe issue]
- Attempts made: [all solutions tried]
- Solution: [what worked]
- Lessons learned: [patterns to remember]

Update CLAUDE.md Common Troubleshooting section.
```

## Checklist Before Ending Session

- [ ] All files saved
- [ ] Important commands documented
- [ ] New tools/configurations noted
- [ ] TODO items identified
- [ ] Challenges and solutions recorded
- [ ] Next session priorities clear

## File Organization

After session update completes, you should have:

```
C:\Users\RichBlanchard\..PROJECTS\CLAUDE WINDOWS\
├── CLAUDE.md (updated)
├── session-2026-02-04.md
├── session-2026-02-05.md
├── session-2026-02-XX.md
├── SESSION-UPDATE-PROMPT.md (this file)
└── [future: summary-FEB-2026.md]

C:\Users\RichBlanchard\.claude\projects\...\memory\
├── MEMORY.md (updated)
├── session-2026-02-04.md (copy)
└── session-2026-02-XX.md (copies)
```

---

## Pro Tips

1. **End each session** - Don't wait days, memory fades
2. **Be specific** - More detail = better future reference
3. **Include commands** - Exact commands with paths
4. **Document failures** - Failed attempts are valuable learning
5. **Link discoveries** - Connect new learnings to existing knowledge
6. **Update TODOs** - Keep priorities current

---

*Save this file as your session update reference!*
