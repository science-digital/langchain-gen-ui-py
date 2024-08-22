# Adding new tools

Steps to add a new (STATIC) tool to the Gen UI application:

#### Frontend

- Add UI template to the `components/prebuilt` directory (ensure any `shadcn` deps also installed).
- Add the template to the `TOOL_COMPONENT_MAP` in `app/agent.tsx`
- Import template into `components/prebuilt/chat.tsx`


#### Backend

- Add a new langtool configuration to the `gen_ui_backend/tools` directory.
- Import the tool into `chain.py` and add it to the `tools` list.