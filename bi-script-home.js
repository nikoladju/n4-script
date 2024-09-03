 (function(global){
    global.pageFunctions = global.pageFunctions || {
      executed: {},
      functions: {},
      dependencies: {},
      requirements: {},
      addFunction: function(id, fn, dependencies = [], requirement = null) {
        if (!this.functions[id]) {
          this.functions[id] = fn;
          this.dependencies[id] = dependencies;
          this.requirements[id] = requirement;
          console.log(`Function ${id} added with dependencies:`, dependencies, 'and requirement:', requirement);
        }
      },
      executeFunctions: function() {
        if (this.added) return;
        this.added = true;
        console.log("Starting function execution...");

        const executeWithDependencies = id => {
          if (this.executed[id]) return;

          const deps = this.dependencies[id] || [];
          const requirement = this.requirements[id];

          // Check if the requirement is 'font-loaded' and delay execution if necessary
          if (requirement === 'font-loaded' && !document.fonts.ready) {
            console.log(`Delaying execution of function ${id} until fonts are loaded.`);
            document.fonts.ready.then(() => {
              executeWithDependencies(id);
            });
            return;
          }

          // Ensure deps is an array before using forEach
          if (Array.isArray(deps) && deps.length > 0) {
            deps.forEach(depId => {
              if (!this.executed[depId]) {
                executeWithDependencies(depId);
              }
            });
          }

          try {
            console.log(`Executing function ${id}`);
            this.functions[id]();
            this.executed[id] = true;
          } catch (e) {
            console.error(`Error executing function ${id}:`, e);
          }
        };

        for (const id in this.functions) {
          executeWithDependencies(id);
        }

        console.log("Function execution completed.");
      },
    };
  })(window);
