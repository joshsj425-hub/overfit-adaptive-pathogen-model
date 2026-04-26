# Overfit: Adaptive Pathogen Model

A real-time biomedical simulation system modeling how outbreaks evolve under intervention, resistance, and adaptive feedback loops.


##  Overview

Overfit is a dynamic outbreak simulation that explores how containment strategies, treatment efforts, and system adaptation interact over time. Instead of modeling a fixed outcome, the system evolves based on user decisions and internal feedback mechanisms.

The goal is to highlight how real-world intervention strategies often involve trade-offs—where actions that improve short-term stability can introduce long-term instability.

## What it does

- Simulates an evolving outbreak environment in real time  
- Tracks three core variables:
  - Spread
  - Resistance
  - Stability
- Applies user-driven interventions that shift system behavior
- Introduces adaptive resistance when similar strategies are repeated
- Produces emergent, non-linear outcomes based on interaction dynamics

## Core idea

Instead of a fixed simulation path, the system behaves like a feedback-driven model where:

- Every action has immediate and delayed effects  
- The system adapts based on repeated user behavior  
- No single strategy remains optimal indefinitely  

This creates a continuously shifting decision environment.


## Built with

- React – frontend interface and real-time rendering  
- JavaScript / TypeScript – core simulation logic  
- Custom state engine – manages variable interactions and updates  
- Event-driven architecture – user actions trigger system transitions  
- CSS / Tailwind – UI styling and layout design  
- Client-side execution – no backend required, fully local simulation  

##  Challenges

- Balancing system behavior to avoid being too stable or too chaotic  
- Tuning resistance growth to create meaningful adaptation without breaking the model  
- Designing interactions that remain understandable despite underlying complexity  
- Structuring the UI to clearly reflect evolving system state in real time  


##  What was learned

- Small changes in system rules can drastically change emergent behavior  
- Complex simulations require careful balance between realism and interpretability  
- Clear UI design is as important as correct system logic  
- Feedback loops are powerful but difficult to tune correctly  

---

##  Live Demo

https://overfit-adaptive-pathogen-model.vercel.app/

---

##  Repository

https://github.com/joshsj425-hub/overfit-adaptive-pathogen-model


##  Future improvements

- Expand adaptive behavior with more complex response models  
- Introduce additional system variables (mutations, recovery rates, etc.)  
- Improve calibration using real-world epidemiological patterns  
- Add scenario presets for different outbreak conditions  
- Enhance visualization of system evolution over time  
