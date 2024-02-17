import * as yup from 'yup';

const faqValidationSchema = yup.object().shape({
  question: yup.string().required(),
  answer: yup.string().required(),
  phases: yup.array().of(yup.string().oneOf(['phase1', 'phase2', 'phase3', 'phase4', 'phase5'])),
  year: yup.number().required(),
});

export default faqValidationSchema;
