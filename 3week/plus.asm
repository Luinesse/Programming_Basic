extern printf, scanf

section .data
        input db "%d %d", 0
        output db "%d", 10, 0

section .bss
        a resb 8
        b resb 8

section .text
    global main
    
main:
        push rbp
        mov rdx, b
        mov rsi, a
        mov rdi, input
        xor eax, eax
        call scanf

        mov rbx, [a]
        add rbx, [b]
        mov rsi, rbx
        mov rdi, output
        xor eax, eax
        call printf
        pop rbp
        mov rax, 0
        ret