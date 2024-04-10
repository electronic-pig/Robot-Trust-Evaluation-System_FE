import { createRouter, createWebHistory } from "vue-router";
import PortalView from "@/views/PortalView.vue";
import HomeView from "@/views/HomeView.vue";
import SurveyView from "@/views/SurveyView.vue";
import AnalysisView from "@/views/AnalysisView.vue";
import ExperimentView from "@/views/ExperimentView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "portal",
      component: PortalView,
    },
    {
      path: "/home",
      component: HomeView,
      children: [
        {
          path: "",
          redirect: "/home/survey",
        },
        {
          path: "survey",
          name: "survey",
          component: SurveyView,
        },
        {
          path: "analysis",
          name: "analysis",
          component: AnalysisView,
        },
        {
          path: "experiment",
          name: "experiment",
          component: ExperimentView,
        },
      ],
    },
  ],
});

export default router;
