# Known Issues / Tech Debt

## EMP_TC007 & EMP_TC008 — "No Records Found" locator flaky
**Status:** Marked as `test.fixme()` in `tests/employee/add-employee.spec.ts`
**Date logged:** 2026-06-20

**Symptom:**
`.oxd-table-body` scoped "No Records Found" locator intermittently not found,
even though manual testing confirms the text appears on screen after searching
for a non-existent employee.

**Suspected causes (not yet confirmed):**
- Demo server response lag causing assertion to fire before DOM updates
- Table wrapper may re-render differently when showing empty state
  (possibly outside `.oxd-table-body`, e.g., a sibling element)
- Search debounce timing — search button might submit before previous
  search's results fully clear

**Next steps:**
- Use `npx playwright codegen` on the empty search result state specifically
- Inspect actual DOM via DevTools when "No Records Found" is shown
- Consider waiting for network idle or a specific API response before asserting