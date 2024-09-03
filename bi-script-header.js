(function(global) {
    global.pageFunctions = global.pageFunctions || {
        executed: {},
        functions: {},
        dependencies: {},
        addFunction: function(id, fn, dependencies = []) {
            if (!this.functions[id]) {
                this.functions[id] = fn; // Ensure that the function is properly stored
                this.dependencies[id] = dependencies;
                console.log(`Function ${id} added with dependencies:`, dependencies);
            }
        },
        executeFunctions: function() {
            if (this.added) return;
            this.added = true;
            console.log("Starting function execution...");

            const executeWithDependencies = id => {
                if (this.executed[id]) return;
                const deps = this.dependencies[id];
                if (deps && deps.length > 0) {
                    deps.forEach(depId => {
                        if (!this.executed[depId]) {
                            executeWithDependencies(depId);
                        }
                    });
                }
                if (typeof this.functions[id] === "function") {
                    try {
                        console.log(`Executing function ${id}`);
                        this.functions[id]();
                        this.executed[id] = true;
                    } catch (e) {
                        console.error(`Error executing function ${id}:`, e);
                    }
                } else {
                    console.error(`Function ${id} is not a valid function`);
                }
            };

            for (const id in this.functions) {
                executeWithDependencies(id);
            }

            console.log("Function execution completed.");
        },
    };

    // Wait for fonts to be ready
    document.fonts.ready.then(function() {
        console.log("Fonts loaded, dispatching custom event...");
        document.dispatchEvent(new CustomEvent("fontsReady"));
    });

})(window);
