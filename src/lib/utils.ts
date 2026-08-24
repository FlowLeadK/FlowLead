import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 여러 개의 Tailwind CSS 클래스명을 조건부로 결합하고
 * 충돌하는 클래스를 깔끔하게 병합해주는 도우미 함수입니다.
 * 
 * @param inputs - 결합할 클래스명 또는 조건부 클래스 객체들
 * @returns 병합된 단일 클래스명 문자열
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
