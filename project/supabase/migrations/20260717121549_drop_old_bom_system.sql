/*
# Drop old BOM / designer system tables

## Purpose
The previous Bill of Materials (BOM) and interactive designer system is being
rebuilt from scratch. This migration removes all database objects that were
created by the old system so the new implementation starts with a clean slate.

## Dropped objects
1. `design_projects` table — saved canvas designs (0 rows)
2. `saved_object_templates` table — reusable designer object templates (0 rows)
3. `pricing_rules` table — editable pricing rule rows + seed data (0 rows of
   live user data; seed rows were inserted by the old migration)
4. `trg_pricing_rules_updated_at` trigger — auto-dropped with its table
5. `update_pricing_rules_updated_at()` function — orphaned after table drop

## Safety
- All three tables confirmed to have 0 rows of user data before dropping.
- Drop is explicitly authorized: user requested a complete BOM system rebuild.
- No foreign keys reference these tables from any other table.

## Notes
- The estimate_requests / estimate_submissions / email_notifications tables
  are NOT touched — they belong to the Estimate page, not the BOM system.
- New BOM tables will be created by fresh migrations in the rebuild.
*/

DROP TABLE IF EXISTS design_projects CASCADE;
DROP TABLE IF EXISTS saved_object_templates CASCADE;
DROP TABLE IF EXISTS pricing_rules CASCADE;

DROP FUNCTION IF EXISTS update_pricing_rules_updated_at();
