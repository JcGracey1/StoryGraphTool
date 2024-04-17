var collected = false;

class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // DONE: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // DONE: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key] // DONE: use `key` to get the data object for the current story location 
        //console.log(key);
        this.engine.show(locationData.Body + "\n\n"); // DONE?: replace this text by the Body of the location data
        
        if(locationData.Choices) { // DONE?: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text + "\n\n");           
            if (choice.Target === "Collect Item") {
                collected = true; // Set collected to true if the choice's target is "Collect Item"
            }
            if (choice.Text === "An indent?") {
                if (collected) {
                    this.engine.gotoScene(WellEnding);
                } else {
                    this.engine.gotoScene(TextScene, "Looks like you need some sort of tool.");
                }
            } else {
                this.engine.gotoScene(Location, choice.Target);
            }
        } else {
            this.engine.gotoScene(End);
        }
    }

}

class TextScene extends Scene {
    create(text) {
        this.engine.show(text + "\n\n");
        this.engine.addChoice("Continue");
    }
    handleChoice(){
        this.engine.gotoScene(Location, "The Courtyard");
    }
}


class WellEnding extends Scene {
    create() {
        this.engine.show("As you pull up the bucket from the well, you notice something inside. Amongst the water and mud, you find the bones of a small dog. It seems to be Timothy's beloved pet, Clover.");
        this.engine.addChoice("Continue");
    }

    handleChoice() {
        this.engine.gotoScene(FinalScene);
    }
}

class FinalScene extends Scene {
    create() {
        this.engine.show("With the discovery of Clover's bones, the spirit of Timothy and his loyal companion can finally find peace. They bid you farewell, grateful for your help, and move on to the afterlife together.");
        this.engine.addChoice("The end.");
    }
    handleChoice() {
        this.engine.gotoScene(End);
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');