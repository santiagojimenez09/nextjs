import prisma from '@/app/lib/prisma';
import { Todo } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import * as yup from 'yup';

interface Segments {
    params: {
        id: string;
    }
}


const getTodo = async (id: string): Promise<Todo | null> => {

    const todo = await prisma.todo.findFirst({ where: { id } });

    return todo;

}

export async function GET(request: Request, { params }: Segments) {


    const todo = await getTodo(params.id);

    if (!todo) {
        return NextResponse.json({ message: `Todo con id ${params.id} no existe` }, { status: 404 });

    }

    return NextResponse.json(params.id);
}


const putSchema = yup.object({
    complete: yup.boolean().optional(),
    description: yup.string().optional()
})

export async function PUT(request: Request, { params }: Segments) {

    const todo = await getTodo(params.id);

    if (!todo) {
        return NextResponse.json({ message: `Todo con id ${params.id} no existe` }, { status: 404 });

    }

    try {

        const { complete, description } = await putSchema.validate(await request.json());

        const updateTodo = await prisma.todo.update({
            where: { id: params.id },
            data: { complete, description }
        })

        return NextResponse.json(updateTodo);

    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }


}