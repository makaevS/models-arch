import { makeAutoObservable } from "mobx";
// import { ChangeMethods, CreateMethods, Defaults, Internals } from ".";
// import { createSelect, Select } from "./select";
// import { createSelectOption, SelectOption } from "./selectOption";

// const enum PeriodTypes {
//   year,
//   quarter,
//   month
// }

// const periodTypesArr = [
//   {
//     label: 'Year',
//     value: PeriodTypes.year
//   },
//   {
//     label: 'Quarter',
//     value: PeriodTypes.quarter
//   },
//   {
//     label: 'Month',
//     value: PeriodTypes.month
//   }
// ];

// const periodsArr = [
//   {
//     value: '2019 year',
//     // type
//   },
//   {
//     value: '2020 year'
//   }
// ]

// type PeriodFormFields = {
//   period: Select<SelectOption<string>>;
//   periodType: Select<SelectOption<PeriodTypes>>;
// }

// // type PeriodFormMethods = ChangeMethods<PeriodFormFields>;

// export type PeriodForm =
//   & Readonly<PeriodFormFields>
//   // & PeriodFormMethods;

// type PeriodFormDefaultModels = PeriodFormFields;

// type PeriodFormDefaultParams = {
//   periodTypeDefault: Defaults<SelectOption<PeriodTypes>>,
//   periodDefault: Defaults<SelectOption<string>>
// }

// export type PeriodFormDefault = Partial<
//   | PeriodFormDefaultModels
//   | PeriodFormDefaultParams
// >;

// export const createPeriodForm = (
//   params: PeriodFormDefault
// ): PeriodForm => {
//   const {
//     period,
//     periodType
//   } = (params as PeriodFormDefaultModels);
//   const {
//     periodDefault,
//     periodTypeDefault
//   } = (params as PeriodFormDefaultParams);
//   const internals: Internals<PeriodForm> = makeAutoObservable({
//     period: period ?? null,
//     periodType: periodType ?? createSelect(periodDefault ?? {
//       options: periodTypesArr.map(option => createSelectOption({
//         displayable: option,
//         selectable: { selected: option.value === PeriodTypes.quarter }
//       }))
//     })
//   });
//   // if(!internals.period) internals.period = createSelect({
//   //   options
//   // });
//   const model = internals as PeriodForm;
//   return model;
// }