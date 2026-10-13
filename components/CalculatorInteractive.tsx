"use client";

import DynamicCalculator from "@/components/DynamicCalculator";
import MortgageCalculator from "@/components/MortgageCalculator";
import FlagshipCalculator from "@/components/FlagshipCalculator";
import DecisionCalculator from "@/components/DecisionCalculator";
import {CalculationGate} from "@/components/CalculationGate";

const flagship=new Set(["mortgage","loan","credit-card","compound-interest","retirement"]);
const decision=new Set(["mortgage-extra-payment","mortgage-15-vs-30","mortgage-affordability","refinance-break-even","balance-transfer","debt-consolidation","retirement-gap","real-return"]);

export default function CalculatorInteractive({slug,actionLabel}:{slug:string;actionLabel:string}){
  let calculator;
  if(slug==="mortgage") calculator=<MortgageCalculator/>;
  else if(decision.has(slug)) calculator=<DecisionCalculator slug={slug}/>;
  else if(flagship.has(slug)) calculator=<FlagshipCalculator slug={slug}/>;
  else calculator=<DynamicCalculator slug={slug}/>;

  return <CalculationGate actionLabel={actionLabel}>{calculator}</CalculationGate>;
}
