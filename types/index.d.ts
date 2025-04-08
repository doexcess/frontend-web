/* eslint-disable no-unused-vars */

declare type InputProps = {
  type: string;
  name: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  required?: boolean;
  value?: string;
  onChange?: any;
};

declare type SelectProps = {
  name: string;
  defaultValue?: string;
  className?: string;
  data: string[];
  required?: boolean;
  value?: string;
  onChange?: any;
};

declare interface DoughnutChartProps {
  title: string;
  data: {
    type: string;
    count: number;
    color: string;
  }[];
}

declare interface signInProps {
  email: string;
  password: string;
  environment: string;
  timezone: string;
}

declare interface GenericResponse {
  statusCode: number;
  message: string;
}
