# Architecture / Project Structure

Notes on the architecture and project structure of the Gen UI application.


## Video walk-throughs

The [original auther](https://github.com/bracesproul) published a 3-part youtube explainer:

- [Part 1 - Intro to Generative UI with LangChain](https://www.youtube.com/watch?v=mL_KuQgX9Oc)
- [Part 2 - Building with LangChain.js](https://www.youtube.com/watch?v=BHOTJ_6wRsY)
  - [JS Repo](https://github.com/bracesproul/gen-ui)
- [Part 3 - Building with LangChain Python](https://www.youtube.com/watch?v=d3uoLbfBPkw)
  - [Python Repo](https://github.com/bracesproul/gen-ui-python)


## Project Structure

The project structure is as follows:

#### Frontend

- `ai/` 
- `app/` - the core NextJS application
- `components/prebuilt` - Static react components for tools UI
- `components/ui` - UI components from `shadcn`
- `lib/` - JS utility functions
- `public/` - Static assets
- `utils/server` - Streaming RSC components from server to the client
- `utils/client` - Client-side utility functions

#### Backend

- `gen_ui_backend/` - FaspAPI application
- `gen_ui_backend/charts/schema` - Pydantic models for FastAPI
- `gen_ui_backend/charts/chain` - LangChain configuration for charts
- `gen_ui_backend/tools` - Langchain configuration for individual tools
- `gen_ui_backend/chain` - LangChain configuration for the main application
- `scripts/` - Utility scripts