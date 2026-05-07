import type { Reference } from "@/components/ReferencesProvider";

export const references: readonly Reference[] = [
  {
    id: "card-moran-newell-1983",
    label: "Card, Moran & Newell 1983",
    citation:
      "Card, S. K., Moran, T. P., & Newell, A. (1983). *The Psychology of Human-Computer Interaction*. Lawrence Erlbaum. The ~100 ms perceptual frame typing-time inference must respect — anything heavier blocks input.",
  },
  {
    id: "miller-1968",
    label: "Miller 1968",
    citation:
      "Miller, R. B. (1968). Response time in man-computer conversational transactions. *Proceedings of the AFIPS Fall Joint Computer Conference*, 33(I), 267–277. The 0.1 s keystroke-echo limit and the 0.1 – 1 s suggestion-display tier inline completion sits across.",
  },
  {
    id: "doherty-1982",
    label: "Doherty 1982",
    citation:
      "Doherty, W. J., & Thadani, A. J. (1982). The Economic Value of Rapid Response Time. IBM Technical Report GE20-0752-0. Productivity drops sharply past ~400 ms — relevant for the suggestion latency budget once the user is waiting on it.",
  },
  {
    id: "arapakis-2014",
    label: "Arapakis et al. 2014",
    citation:
      "Arapakis, I., Bai, X., & Cambazoglu, B. B. (2014). Impact of response latency on user behavior in web search. *Proceedings of SIGIR '14*, 103–112. Below ~500 ms users rarely consciously notice latency; above ~1,000 ms detection is high. The suggestion budget sits inside this window.",
  },
];
